import { Injectable, signal, resource, linkedSignal } from '@angular/core';
import { runFlow } from 'genkit/beta/client';
import { AssistantResponse, Chat, Role } from '../models/genkitModels';

// Constantes para la aplicación
const USER = 'USER';
const ASSISTANT = 'ASSISTANT';
const ENDPOINT = '/angularAssistantFlow';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

@Injectable({
  providedIn: 'root'
})
export class GenkitService {
  // Señales para el estado
  userInput = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  // Señal para controlar si es la primera solicitud
  private isFirstRequest = signal(true);

  // ID de sesión para mantener el contexto con GenKit
  sessionId = linkedSignal<string>((): string => {
    this.userInput(); // Para que se reactive cuando cambie userInput
    return Date.now() + '' + Math.floor(Math.random() * 1000000000);
  });

  // Limpiar sesión solo en la solicitud inicial
  clearSession = linkedSignal<boolean>((): boolean => this.isFirstRequest());

  // Historial de chat
  chat = signal<Chat[]>([]);

  // Resource para manejar las solicitudes a GenKit
  assistantResource = resource<AssistantResponse, { userInput: string }>({
    params: () => ({ userInput: this.userInput() }),
    loader: async ({ params }): Promise<AssistantResponse> => {
      if (!params.userInput?.trim()) {
        return { response: '', examples: [], codeSnippets: [] };
      }

      this.isLoading.set(true);
      this.errorMessage.set('');

      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
          console.log(`🚀 Enviando solicitud (intento ${attempt + 1}):`, params.userInput);

          const result = await runFlow({
            url: ENDPOINT,
            input: {
              userInput: params.userInput,
              sessionId: this.sessionId(),
              clearSession: this.clearSession()
            }
          });

          console.log('✅ Respuesta recibida:', result);
          this.isLoading.set(false);

          // Marcar que ya no es la primera solicitud
          this.isFirstRequest.set(false);

          // Actualizar chat cuando recibimos respuesta
          if (result && typeof result === 'object' && 'response' in result) {
            const assistantResponse = result as AssistantResponse;
            if (assistantResponse.response && assistantResponse.response !== '') {
              const chatItem = this.createChatItem(assistantResponse.response, ASSISTANT);
              this.chat.update(currentChat => [chatItem, ...currentChat]);
            }
            return assistantResponse;
          } else {
            // Si la respuesta no tiene la estructura esperada, adaptarla
            const adaptedResponse = {
              response: typeof result === 'string' ? result : JSON.stringify(result),
              examples: [],
              codeSnippets: []
            };
            if (adaptedResponse.response) {
              const chatItem = this.createChatItem(adaptedResponse.response, ASSISTANT);
              this.chat.update(currentChat => [chatItem, ...currentChat]);
            }
            return adaptedResponse;
          }
        } catch (error) {
          console.error(`❌ Intento ${attempt + 1} falló:`, error);

          if (attempt === MAX_RETRIES - 1) {
            // Último intento falló
            this.isLoading.set(false);
            const errorMsg = this.getErrorMessage(error);
            this.errorMessage.set(errorMsg);

            // Agregar mensaje de error al chat
            const errorChatItem = this.createChatItem(
              `⚠️ Error de conexión: ${errorMsg}. Por favor, intenta nuevamente.`,
              ASSISTANT
            );
            this.chat.update(currentChat => [errorChatItem, ...currentChat]);

            // Devolver respuesta por defecto para evitar romper la aplicación
            return {
              response: 'Lo siento, hay un problema de conectividad. Por favor, intenta nuevamente en unos momentos.',
              examples: ['Reintentar', 'Verificar conexión', 'Contactar soporte'],
              codeSnippets: []
            };
          }

          // Esperar antes del siguiente intento con backoff exponencial
          await this.delay(RETRY_DELAY * Math.pow(2, attempt));
        }
      }

      // Este punto nunca debería alcanzarse, pero está aquí por seguridad
      this.isLoading.set(false);
      return { response: '', examples: [], codeSnippets: [] };
    }
  });

  // Método para añadir mensaje del usuario al chat
  addUserMessage(userInput: string): void {
    this.errorMessage.set('');

    const chatItem = this.createChatItem(userInput, USER);
    this.chat.update(currentChat => [chatItem, ...currentChat]);

    // Disparar el resource con el nuevo input
    this.userInput.set(userInput);
  }

  // Crear un ítem de chat
  createChatItem(text: string, role: Role): Chat {
    return {
      id: Math.floor(Math.random() * 2000000) + Date.now(),
      role,
      text,
      timestamp: new Date().toISOString()
    };
  }

  // Manejar errores
  private getErrorMessage(error: any): string {
    if (error instanceof Error) {
      if (error.message.includes('fetch failed') || error.message.includes('Failed to fetch')) {
        return 'Error de conexión con el servidor. Verifica que el servidor esté ejecutándose en http://localhost:4000';
      }
      if (error.message.includes('GoogleGenerativeAI Error') || error.message.includes('API key')) {
        return 'Error con la API de Google AI. Verifica que tu GOOGLE_GENAI_API_KEY esté configurada correctamente';
      }
      if (error.message.includes('404')) {
        return 'Endpoint no encontrado. Verifica que el servidor tenga los flujos configurados';
      }
      return error.message;
    }
    return 'Error desconocido. Por favor, intenta nuevamente.';
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Reintentar la solicitud
  retry(): void {
    if (this.userInput()) {
      this.assistantResource.reload();
    }
  }

  // Método para limpiar el chat
  clearChat(): void {
    this.chat.set([]);
    this.userInput.set('');
    this.errorMessage.set('');
    this.isFirstRequest.set(true);
  }
}

