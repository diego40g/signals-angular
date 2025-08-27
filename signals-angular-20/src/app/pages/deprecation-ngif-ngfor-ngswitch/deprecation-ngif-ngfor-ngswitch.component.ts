import { Component } from '@angular/core';
import { User } from './models/user';
import { CommonModule } from '@angular/common';
import { NgifDemoComponent } from './components/ngif-demo/ngif-demo.component';
import { NgforDemoComponent } from './components/ngfor-demo/ngfor-demo.component';
import { NgswitchDemoComponent } from './components/ngswitch-demo/ngswitch-demo.component';

@Component({
  selector: 'app-deprecation-ngif-ngfor-ngswitch',
  imports: [CommonModule, NgifDemoComponent, NgforDemoComponent, NgswitchDemoComponent],
  templateUrl: './deprecation-ngif-ngfor-ngswitch.component.html',
  styleUrl: './deprecation-ngif-ngfor-ngswitch.component.sass'
})
export class DeprecationNgifNgforNgswitchComponent {
  selectedTab = 'ngif';

  changeTab(tab: string): void {
    this.selectedTab = tab;
  }
}
