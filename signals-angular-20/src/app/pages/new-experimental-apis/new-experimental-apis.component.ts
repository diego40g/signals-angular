import { Component, computed, inject, signal, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@models/user';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, lastValueFrom } from 'rxjs';
import { ResourceComponent } from './components/resource/resource.component';

@Component({
  selector: 'app-new-experimental-apis',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ResourceComponent],
  templateUrl: './new-experimental-apis.component.html',
  styleUrl: './new-experimental-apis.component.sass'
})
export class NewExperimentalApisComponent {
  private http = inject(HttpClient);

  // Signal para el ID del usuario que queremos cargar.
  public userId = signal('1');

  // 1. Usamos `resource` con `params` para reaccionar a los cambios de `userId`.
  private userResource = resource({
    // `params` define las dependencias reactivas.
    params: () => ({ id: this.userId() }),

    // `loader` se ejecuta cada vez que el valor de `params` cambia.
    // Recibe los `params` y un `abortSignal` para cancelar peticiones.
    loader: ({ params }): Promise<User> => {
      // Convertimos el Observable de HttpClient a una Promise, que es lo que `resource` espera.
      return lastValueFrom(this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${params.id}`).pipe(
        catchError(err => {
          // Lanza siempre una instancia de Error
          throw new Error(typeof err === 'string' ? err : JSON.stringify(err));
        })
      ));
    }
  });

  // 2. Signals computadas para el único usuario.
  // Accedemos a las señales `value` y `state` dentro del objeto `userResource`.
  public user = computed(() => this.userResource.value());

  // Método para cambiar el usuario a cargar.
  changeUser(event: Event): void {
    const id = (event.target as HTMLSelectElement).value;
    this.userId.set(id);
  }
}
