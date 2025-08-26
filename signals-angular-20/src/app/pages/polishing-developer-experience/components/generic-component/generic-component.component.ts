import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-generic-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-component.component.html',
  styleUrl: './generic-component.component.sass'
})
export class GenericComponentComponent {
  title = input<string>('');
  canClose = input<boolean>(false);
  onClose = output<string>();
  titleChange = output<string>();

  closeComponent() {
    this.onClose.emit('Component closed successfully');
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.changeTitle(value);
  }

  changeTitle(newTitle: string) {
    this.titleChange.emit(newTitle);
  }
}
