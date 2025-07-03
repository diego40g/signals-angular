import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal-optimization',
  imports: [],
  templateUrl: './signal-optimization.component.html',
  styleUrl: './signal-optimization.component.sass'
})
export class SignalOptimizationComponent {
  count = signal(0);

  increment() {
    this.count.set(this.count() + 1);
  }
}
