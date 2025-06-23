import { Component, computed, inject, signal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  private userService = inject(UserService);

  // 1. Consumimos las signals directamente del servicio. ¡No se necesita toSignal!
  public users = this.userService.users;
  public loading = this.userService.loading;
  public error = this.userService.error;

  // 2. Creamos un Signal para el término de búsqueda.
  public searchTerm = signal<string>('');

  // 3. El Signal COMPUTADO para filtrar no cambia su lógica.
  // Sigue dependiendo de `users()` y `searchTerm()` y se recalculará
  // automáticamente cuando cualquiera de los dos cambie.
  public filteredUsers: Signal<User[]> = computed(() => {
    const users = this.users(); // Obtenemos el valor de la signal de usuarios del servicio
    const term = this.searchTerm().toLowerCase();

    if (!term) {
      return users; // Si no hay término de búsqueda, devuelve todos los usuarios
    }

    return users.filter(user => user.name.toLowerCase().includes(term));
  });

  // Método para actualizar el signal `searchTerm` cuando el usuario escribe.
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}
