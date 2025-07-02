import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { User } from '@app/models/user';

@Component({
  selector: 'app-http-resource',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './http-resource.component.html',
  styleUrl: './http-resource.component.sass'
})
export class HttpResourceComponent {
  userId = signal(1);

  userResource = httpResource<User>(() =>
    `https://jsonplaceholder.typicode.com/users/${this.userId()}`,
  );

  changeUserId(id: number) {
    this.userId.set(id);
  }
}
