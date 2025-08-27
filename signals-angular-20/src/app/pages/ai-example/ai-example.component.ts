import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenkitService } from './services/genkit.service';

@Component({
  selector: 'app-ai-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-example.component.html',
  styleUrl: './ai-example.component.sass'
})
export class AiExampleComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  currentInput = '';
  private shouldScroll = false;

  constructor(public service: GenkitService) {}

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  sendMessage() {
    if (!this.currentInput.trim() || this.service.isLoading()) return;

    this.service.addUserMessage(this.currentInput);
    this.currentInput = '';
    this.shouldScroll = true; // Marcar para hacer scroll después de la actualización
  }

  formatTime(timestamp: string): string {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatMessage(text: string): string {
    // Reemplazar bloques de código con mejor formato
    let formattedText = text.replace(/```([\w-]+)?\n([\s\S]*?)```/g,
      (_, language, code) => {
        const lang = language || 'typescript';
        const escapedCode = this.escapeHtml(code.trim());
        return `<div class="code-block"><div class="code-header">${lang}</div><pre><code class="language-${lang}">${escapedCode}</code></pre></div>`;
      });

    // Reemplazar código inline
    formattedText = formattedText.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Reemplazar enlaces
    formattedText = formattedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Reemplazar texto en negrita
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Reemplazar texto en cursiva
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Reemplazar saltos de línea por <br>
    formattedText = formattedText.replace(/\n/g, '<br>');

    return formattedText;
  }

  private escapeHtml(html: string): string {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    } catch (err) {
      console.error('Error al hacer scroll:', err);
    }
  }

  selectSuggestion(suggestion: string) {
    this.currentInput = suggestion;
    this.sendMessage();
  }

  // Método para limpiar el chat
  clearChat() {
    this.service.clearChat();
    this.currentInput = '';
  }

  // Método para manejar Enter en el textarea
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  // Mostrar ejemplos de la respuesta del asistente
  showExamples(): string[] {
    const resource = this.service.assistantResource;
    if (resource.isLoading() || resource.error()) return [];

    const value = resource.value();
    return value?.examples || [];
  }

  // Mostrar snippets de código de la respuesta del asistente
  showCodeSnippets() {
    const resource = this.service.assistantResource;
    if (resource.isLoading() || resource.error()) return [];

    const value = resource.value();
    return value?.codeSnippets || [];
  }
}
