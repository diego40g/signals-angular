# Comparativa: API Directa vs Genkit

## Resumen de Diferencias

| Aspecto | API Directa (Actual) | Genkit |
|---------|---------------------|---------|
| **Configuración** | Manual headers/auth | Automática |
| **Proveedores** | Uno a la vez | Múltiples |
| **Streaming** | Implementación manual | Nativo |
| **Herramientas** | No disponible | RAG, Tools, Functions |
| **Escalabilidad** | Limitada | Alta |
| **Mantenimiento** | Alto | Bajo |
| **Curva de aprendizaje** | Baja | Media |


## Pasos para usar Genkit

### 1. Instalación de dependencias

```bash
npm i --save genkit 
# Gemmini
npm i -save @genkit-ai/googleai

# Si usas OpenAI en lugar de Google
npm install @genkit-ai/openai
```

### 2. API KEY del Google Studio IA
```bash
export GOOGLE_GENAI_API_KEY=<your API key>
```
O a su vez puede configurarse desde un dotenv desde el proyecto

```.env
GOOGLE_GENAI_API_KEY=<your API key>
```
