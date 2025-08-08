import { Component } from '@angular/core';
import { InformationComponent } from './components/information/information.component';
import { HydrateOnViewportComponent } from './components/hydrate-on-viewport/hydrate-on-viewport.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solidifying-angular-server',
  standalone: true,
  imports: [CommonModule, InformationComponent, HydrateOnViewportComponent],
  templateUrl: './solidifying-angular-server.component.html',
  styleUrl: './solidifying-angular-server.component.sass'
})
export class SolidifyingAngularServerComponent {
  activeTab: string = 'information';

menuItems = [
    { id: 'information', label: 'Informacion de Hidratación incremental y rutas', icon: '💧' },
    { id: 'hydrate-on-viewport', label: 'Demo: Hidratación incremental', icon: '⚡' }
  ];

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  isActiveTab(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}
