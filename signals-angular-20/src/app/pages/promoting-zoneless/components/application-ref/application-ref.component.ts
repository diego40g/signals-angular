import { ApplicationRef, Component } from '@angular/core';

@Component({
  selector: 'app-application-ref',
  imports: [],
  templateUrl: './application-ref.component.html',
  styleUrl: './application-ref.component.sass'
})
export class ApplicationRefComponent {
  message = 'Initial state';

  constructor(private appRef: ApplicationRef) {}

  updateState() {
    this.message = 'State updated at ' + new Date().toLocaleTimeString();
    // Manually trigger change detection
    this.appRef.tick();
  }
}
