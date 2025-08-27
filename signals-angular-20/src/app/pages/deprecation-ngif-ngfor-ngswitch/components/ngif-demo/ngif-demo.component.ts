import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ngif-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngif-demo.component.html',
  styleUrl: './ngif-demo.component.sass'
})
export class NgifDemoComponent {
  showContent = true;

  toggleContent(): void {
    this.showContent = !this.showContent;
  }
}
