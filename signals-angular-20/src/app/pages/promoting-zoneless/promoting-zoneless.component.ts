import { Component } from '@angular/core';
import { ApplicationRefComponent } from './components/application-ref/application-ref.component';
import { ChangeDetectorDefComponent } from './components/change-detector-def/change-detector-def.component';
import { InformationComponent } from './components/information/information.component';
import { MultiStreamComponent } from './components/multi-stream/multi-stream.component';
import { SignalOptimizationComponent } from './components/signal-optimization/signal-optimization.component';

@Component({
  selector: 'app-promoting-zoneless',
  imports: [
    ApplicationRefComponent,
    ChangeDetectorDefComponent,
    InformationComponent,
    MultiStreamComponent,
    SignalOptimizationComponent
  ],
  templateUrl: './promoting-zoneless.component.html',
  styleUrl: './promoting-zoneless.component.sass'
})
export class PromotingZonelessComponent {
  activeTab = 'information';

  menuItems = [
    { id: 'information', label: 'Información General', icon: '📚' },
    { id: 'change-detector-ref', label: 'ChangeDetectorRef', icon: '🔄' },
    { id: 'application-ref', label: 'ApplicationRef', icon: '🚀' },
    { id: 'signal-optimization', label: 'Optimización con Signals', icon: '⚡' },
    { id: 'multi-stream', label: 'Múltiples Streams', icon: '🌊' }
  ];

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}
