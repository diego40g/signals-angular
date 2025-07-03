import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-multi-stream',
  imports: [AsyncPipe],
  templateUrl: './multi-stream.component.html',
  styleUrl: './multi-stream.component.sass'
})
export class MultiStreamComponent {
  value$ = interval(1000);
}
