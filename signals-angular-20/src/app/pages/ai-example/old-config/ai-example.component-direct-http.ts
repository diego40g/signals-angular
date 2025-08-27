// import { CommonModule } from '@angular/common';
// import { Component, computed, effect, signal } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { AIResponse } from './models/aiResponse';
// import { GenAIService } from './services/gen-ai.service';

// @Component({
//   selector: 'app-ai-example',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './ai-example.component.html',
//   styleUrl: './ai-example.component.sass'
// })
// export class AiExampleComponent {
//   // Signals para el chat con IA
//   conversation = signal<AIResponse[]>([]);
//   currentPrompt = signal('');

//   // Computed values
//   conversationCount = computed(() => this.conversation().length);
//   isWaitingForResponse = computed(() => this.genAIService.isLoading());
//   hasError = computed(() => this.genAIService.error());

//   constructor(private genAIService: GenAIService) {
//     // Effect para logging de conversaciones
//     effect(() => {
//       console.log(`Conversation messages: ${this.conversationCount()}`);
//     });
//   }

//   sendPrompt() {
//     const prompt = this.currentPrompt().trim();
//     if (!prompt) return;

//     // Agregar mensaje del usuario
//     this.conversation.update(messages => [
//       ...messages,
//       {
//         message: prompt,
//         timestamp: new Date(),
//         type: 'user'
//       }
//     ]);

//     // Limpiar el input
//     this.currentPrompt.set('');

//     // Llamar a la API de GenAI
//     this.genAIService.generateResponse(prompt).subscribe({
//       next: (response) => {
//         // Agregar respuesta de la IA - response ya es string
//         this.conversation.update(messages => [
//           ...messages,
//           {
//             message: response || 'Sin respuesta',
//             timestamp: new Date(),
//             type: 'ai'
//           }
//         ]);
//       },
//       error: (error) => {
//         console.error('Error al obtener respuesta:', error);
//         this.genAIService.error.set('Error al obtener respuesta de la IA');
//       }
//     });
//   }

//   clearConversation() {
//     this.conversation.set([]);
//   }

//   // Ejemplos predefinidos de prompts
//   useExamplePrompt(prompt: string) {
//     this.currentPrompt.set(prompt);
//   }

//   // Método para simular respuesta (para desarrollo sin API key)
//   simulateAIResponse() {
//     const prompt = this.currentPrompt().trim();
//     if (!prompt) return;

//     // Agregar mensaje del usuario
//     this.conversation.update(messages => [
//       ...messages,
//       {
//         message: prompt,
//         timestamp: new Date(),
//         type: 'user'
//       }
//     ]);

//     // Simular delay de API
//     setTimeout(() => {
//       this.conversation.update(messages => [
//         ...messages,
//         {
//           message: `Respuesta simulada para: "${prompt}". Esta es una demostración de cómo integrar GenAI con Angular Signals.`,
//           timestamp: new Date(),
//           type: 'ai'
//         }
//       ]);
//     }, 1000);

//     this.currentPrompt.set('');
//   }
// }
