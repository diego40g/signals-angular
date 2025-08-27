import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-ngfor-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngfor-demo.component.html',
  styleUrl: './ngfor-demo.component.sass'
})
export class NgforDemoComponent {
  users: User[] = [
    { id: 1, name: 'Juan Pérez', age: 25, role: 'admin', isActive: true },
    { id: 2, name: 'María García', age: 30, role: 'user', isActive: false },
    { id: 3, name: 'Carlos López', age: 28, role: 'guest', isActive: true }
  ];
}
