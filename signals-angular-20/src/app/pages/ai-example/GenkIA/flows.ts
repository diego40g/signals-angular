import { Chat, genkit, SessionData, SessionStore } from "genkit/beta";
import { z } from "zod";
import { googleAI, gemini20Flash } from "@genkit-ai/googleai";
import { preamblePrompt, queryPrompt, codeExamplePrompt, compareVersionsPrompt } from './prompts';
import { parse } from 'partial-json';
import { config } from 'dotenv';
config();

// Solo usamos Gemini como modelo
const model = gemini20Flash;

const ai = genkit({
  plugins: [googleAI()],
  model
});

const preamble = ai.definePrompt(
  { name: 'preamble' },
  preamblePrompt
);

// Estado de la sesión
interface AssistantState {
  lastTopic?: string;
  topics?: string[];
}

// Schema para la respuesta
const AssistantResponseSchema = z.object({
  response: z.string(),
  examples: z.array(z.string()),
  codeSnippets: z.array(z.object({
    language: z.string(),
    code: z.string(),
    description: z.optional(z.string())
  }))
});

// Flujo principal para responder consultas
export const angularAssistantFlow = ai.defineFlow(
  {
    name: 'angularAssistantFlow',
    inputSchema: z.object({
      userInput: z.string(),
      sessionId: z.string(),
      clearSession: z.boolean()
    }),
    outputSchema: AssistantResponseSchema
  },
  async ({ userInput, sessionId, clearSession }) => {
    let chat: Chat;

    if (clearSession) {
      const session = ai.createSession<AssistantState>({
        store: new JsonSessionStore(),
        sessionId,
        initialState: { topics: [] }
      });
      chat = session.chat(preamble, { sessionId, model });
      await session.updateMessages(sessionId, []);
    } else {
      const session = await ai.loadSession(sessionId, {
        store: new JsonSessionStore(),
      });
      chat = session.chat({ sessionId, model });
    }

    try {
      const { text } = await chat.send(queryPrompt(userInput));
      return parse(maybeStripMarkdown(text));
    } catch (error) {
      console.error('Error en angularAssistantFlow:', error);
      return {
        response: 'Lo siento, hubo un error al procesar tu consulta. Por favor intenta nuevamente.',
        examples: ['Signals en Angular 20', 'Nuevo flujo de control', 'Server-side rendering'],
        codeSnippets: []
      };
    }
  }
);

// Flujo para generar ejemplos de código
export const codeExampleFlow = ai.defineFlow(
  {
    name: 'codeExampleFlow',
    inputSchema: z.object({
      feature: z.string(),
      sessionId: z.string()
    }),
    outputSchema: z.string()
  },
  async ({ feature, sessionId }) => {
    const session = await ai.loadSession(sessionId, {
      store: new JsonSessionStore(),
    });
    const chat = session.chat({ sessionId, model });

    try {
      const { text } = await chat.send(codeExamplePrompt(feature));
      return text;
    } catch (error) {
      console.error('Error en codeExampleFlow:', error);
      return '// Lo siento, no pude generar un ejemplo de código para esta característica.';
    }
  }
);

// Flujo para comparar versiones
export const compareVersionsFlow = ai.defineFlow(
  {
    name: 'compareVersionsFlow',
    inputSchema: z.object({
      feature: z.string(),
      sessionId: z.string()
    }),
    outputSchema: z.object({
      featureName: z.string(),
      description: z.string(),
      previousImplementation: z.object({
        description: z.string(),
        code: z.string()
      }),
      angular20Implementation: z.object({
        description: z.string(),
        code: z.string()
      }),
      benefits: z.array(z.string()),
      migrationNotes: z.string()
    })
  },
  async ({ feature, sessionId }) => {
    const session = await ai.loadSession(sessionId, {
      store: new JsonSessionStore(),
    });
    const chat = session.chat({ sessionId, model });

    try {
      const { text } = await chat.send(compareVersionsPrompt(feature));
      return parse(maybeStripMarkdown(text));
    } catch (error) {
      console.error('Error en compareVersionsFlow:', error);
      return {
        featureName: feature,
        description: 'No se pudo obtener información comparativa',
        previousImplementation: {
          description: 'Información no disponible',
          code: '// No disponible'
        },
        angular20Implementation: {
          description: 'Información no disponible',
          code: '// No disponible'
        },
        benefits: ['No disponible'],
        migrationNotes: 'No disponible'
      };
    }
  }
);

// Utilidad para eliminar formato markdown
const markdownRegex = /^\s*(```json)?((.|\n)*?)(```)?\s*$/i;
function maybeStripMarkdown(withMarkdown: string) {
  const mdMatch = markdownRegex.exec(withMarkdown);
  if (!mdMatch) {
    return withMarkdown;
  }
  return mdMatch[2];
}

// Almacén de sesiones simple (para demo)
const sessionStore: { [key: string]: SessionData } = {};
class JsonSessionStore<S = any> implements SessionStore<S> {
  async get(sessionId: string): Promise<SessionData<S> | undefined> {
    if (sessionId in sessionStore)
      return sessionStore[sessionId];
    else {
      return undefined;
    }
  }

  async save(sessionId: string, sessionData: SessionData<S>): Promise<void> {
    sessionStore[sessionId] = sessionData;
  }
}
