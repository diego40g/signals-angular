export const preamblePrompt = `
Eres un asistente especializado en Angular 20, experto en todas las nuevas características y mejoras
que ofrece esta versión del framework. Tu objetivo es proporcionar información detallada, ejemplos
de código y explicaciones claras sobre:

1. El nuevo sistema de señales (signals)
2. Modo zoneless para mejor rendimiento
3. El nuevo flujo de control (@if, @for, @switch)
4. Server Side Rendering y hidratación
5. Nuevas APIs experimentales (resource, dataStream)
6. Mejoras en la experiencia del desarrollador
7. Componentes dinámicos con createComponent

Proporciona respuestas concisas, técnicamente precisas y con ejemplos de código cuando sea relevante.
`;

export function queryPrompt(userInput: string): string {
  return `El usuario está preguntando sobre Angular 20: "${userInput}".

Proporciona una respuesta detallada y técnicamente precisa sobre el tema solicitado.
Si el usuario no ha especificado un tema claro, pregunta sobre qué aspecto de Angular 20
le gustaría saber más.

Cuando proporciones ejemplos de código, asegúrate de que sean prácticos, actuales
y siguiendo las mejores prácticas de Angular 20.

Si se trata de una nueva característica en Angular 20, compárala con la forma en que
se hacía en versiones anteriores para destacar las mejoras.

Responde en formato JSON con la siguiente estructura:

{
  "response": "Tu respuesta detallada aquí",
  "examples": [
    "Ejemplo relacionado 1",
    "Ejemplo relacionado 2",
    "Ejemplo relacionado 3"
  ],
  "codeSnippets": [
    {
      "language": "typescript",
      "code": "// Código de ejemplo aquí",
      "description": "Descripción del código"
    }
  ]
}
`;
}

export function codeExamplePrompt(feature: string): string {
  return `
Genera un ejemplo de código práctico y completo para la siguiente característica de Angular 20:
"${feature}".

El ejemplo debe:
1. Ser un caso de uso real y práctico
2. Seguir las mejores prácticas de Angular 20
3. Incluir comentarios explicativos
4. Ser técnicamente preciso

Si la característica implica un cambio desde versiones anteriores de Angular, muestra también
cómo se hacía antes para comparar.

Responde solo con el código y sus comentarios, sin texto adicional.
`;
}

export function compareVersionsPrompt(feature: string): string {
  return `
Compara cómo se implementa "${feature}" en Angular 20 versus cómo se hacía en versiones anteriores.

Proporciona:
1. Una breve explicación de la característica
2. Cómo se implementaba en Angular 16-19
3. Cómo se implementa en Angular 20
4. Las ventajas del nuevo enfoque
5. Consideraciones de migración

Incluye ejemplos de código para ambas versiones.

Responde en formato JSON con la siguiente estructura:

{
  "featureName": "Nombre de la característica",
  "description": "Descripción breve",
  "previousImplementation": {
    "description": "Cómo se hacía antes",
    "code": "// Código de ejemplo en versiones anteriores"
  },
  "angular20Implementation": {
    "description": "Cómo se hace en Angular 20",
    "code": "// Código de ejemplo en Angular 20"
  },
  "benefits": [
    "Beneficio 1",
    "Beneficio 2"
  ],
  "migrationNotes": "Notas sobre la migración"
}
`;
}
