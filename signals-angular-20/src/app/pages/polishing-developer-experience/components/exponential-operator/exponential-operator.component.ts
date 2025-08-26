import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-exponential-operator',
  standalone: true,
  imports: [],
  templateUrl: './exponential-operator.component.html',
  styleUrl: './exponential-operator.component.sass'
})
export class ExponentialOperatorComponent {
  baseNumber = signal(2);
  exponent = signal(3);

  setBaseNumber(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.baseNumber.set(value);
  }

  setExponent(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.exponent.set(value);
  }
}