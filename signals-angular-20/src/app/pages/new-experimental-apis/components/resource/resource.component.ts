import { CommonModule } from '@angular/common';
import { Component, effect, resource, Signal, signal } from '@angular/core';
import { User } from '@models/user';

@Component({
  selector: 'app-resource',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.sass']
})
export class ResourceComponent {
  userId: Signal<string> = getUserId();

  userResource = resource <User, { id: string }>({
    params: () => ({ id: this.userId() }),
    async loader({ params, abortSignal }): Promise<User> {
      // fetch cancels any outstanding HTTP requests when the given `AbortSignal`
      // indicates that the request has been aborted.
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`, { signal: abortSignal });
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    },
  });

  listUsersResource = resource <User[], { id: string }>({
    params: () => ({ id: this.userId() }),
    async loader({ params, abortSignal }): Promise<User[]> {
      // fetch cancels any outstanding HTTP requests when the given `AbortSignal`
      // indicates that the request has been aborted.
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/`, { signal: abortSignal });
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    },
  });

  constructor() { 
    effect(() => {
      // userResource es un ResourceRef, no una función
      const user = this.userResource.value();
      const listUsers = this.listUsersResource.value();
      //console.log('Valor actual de userResource:', user);
      //console.log('isLoading:', this.userResource.isLoading());
      
      if (user) {
        console.log('Datos del usuario:', user);
      }
      if (listUsers) {
        console.log('Lista de usuarios:', listUsers.length);
      }
    });
  }
}

// Dummy getUserId function for demonstration
function getUserId(): Signal<string> {
  // In a real application, this would likely come from an authentication service
  return signal('1'); // Default user ID
}