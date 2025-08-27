import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ngswitch-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngswitch-demo.component.html',
  styleUrl: './ngswitch-demo.component.sass'
})
export class NgswitchDemoComponent {
  currentUserRole: 'admin' | 'user' | 'guest' = 'admin';

  changeUserRole(role: 'admin' | 'user' | 'guest'): void {
    this.currentUserRole = role;
  }
}
