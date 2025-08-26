import { Component, signal } from '@angular/core';
import { Person } from '../../models/person';

@Component({
  selector: 'app-in-operator',
  standalone: true,
  imports: [],
  templateUrl: './in-operator.component.html',
  styleUrl: './in-operator.component.sass'
})
export class InOperatorComponent {
  person = signal<Person>({});

  readonly JSON = JSON;

  addProperty(key: keyof Person, value: any) {
    this.person.update(p => ({ ...p, [key]: value}));
  }

  removeProperty(key: keyof Person) {
    this.person.update(p => {
      const newPerson = {...p};
      delete newPerson[key];
      return newPerson;
    })
  }

  clearPerson() {
    this.person.set({});
  }
}
