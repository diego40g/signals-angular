import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UsersState } from '../models/users-state';
import { User } from '@models/user';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  
  // Signal de estado privada que gestiona los usuarios, el estado de carga y los errores.
  #state = signal<UsersState>({
    users: [],
    loading: false,
    error: null
  })

  // Signals públicas (de solo lectura) para que los componentes puedan consumirlas.
  public readonly users = computed(() => this.#state().users);
  public readonly loading = computed(() => this.#state().loading);
  public readonly error = computed(() => this.#state().error);

  constructor() {
    this.http.get<User[]>(this.apiUrl).pipe(
      delay(500) // Mantenemos el delay para simular la latencia de red
    ).subscribe({
      next: (users) => {
        // Actualizamos el estado con los usuarios y marcamos la carga como finalizada
        this.#state.set({ users, loading: false, error: null });
      },
      error: (err) => {
        console.error(err);
        // En caso de error, lo reflejamos en el estado
        this.#state.set({ users: [], loading: false, error: 'No se pudieron cargar los usuarios.' });
      }
    });
  }
}