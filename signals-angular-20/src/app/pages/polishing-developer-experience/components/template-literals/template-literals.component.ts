import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-template-literals',
  standalone: true,
  imports: [],
  templateUrl: './template-literals.component.html',
  styleUrl: './template-literals.component.sass'
})
export class TemplateLiteralsComponent {
  colWidth = signal('md');
  theme = signal('light');

  setColWidth(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.colWidth.set(value);
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }

  setTheme(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.theme.set(value);
  }
}
