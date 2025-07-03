import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-change-detector-def',
  imports: [],
  templateUrl: './change-detector-def.component.html',
  styleUrl: './change-detector-def.component.sass'
})
export class ChangeDetectorDefComponent {
  value = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  incrementValue() {
    this.value++;
    // Manually trigger change detection
    // this.cdr.detectChanges();
    this.cdr.markForCheck();
  }
}
