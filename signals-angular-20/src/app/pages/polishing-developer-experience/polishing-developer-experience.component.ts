import { Component, computed, signal } from '@angular/core';
import { DebugPanelComponent } from './components/debug-panel/debug-panel.component';
import { DynamicComponentComponent } from './components/dynamic-component/dynamic-component.component';
import { ExponentialOperatorComponent } from './components/exponential-operator/exponential-operator.component';
import { InOperatorComponent } from './components/in-operator/in-operator.component';
import { TemplateLiteralsComponent } from './components/template-literals/template-literals.component';
import { ExtendedDiagnosticsComponent } from './components/extended-diagnostics/extended-diagnostics.component';
import { HostBindingsComponent } from './components/host-bindings/host-bindings.component';

// Define el tipo para los componentes
type ComponentType = 'debug-panel' | 'dynamic-component' | 'exponential-operator' | 'in-operator' | 'template-literals' | 'extended-diagnostics' | 'host-bindings';

@Component({
  selector: 'app-polishing-developer-experience',
  standalone: true,
  imports: [
    DebugPanelComponent,
    DynamicComponentComponent,
    ExponentialOperatorComponent,
    InOperatorComponent,
    TemplateLiteralsComponent,
    ExtendedDiagnosticsComponent,
    HostBindingsComponent
  ],
  templateUrl: './polishing-developer-experience.component.html',
  styleUrl: './polishing-developer-experience.component.sass'
})
export class PolishingDeveloperExperienceComponent {
  // Signal para el componente activo
  public activeComponent = signal<ComponentType>('host-bindings');

  // Opciones del menú
  public menuOptions = [
    {
      key: 'host-bindings' as ComponentType,
      label: 'Host Bindings Mejorados',
      description: 'Mejoras en la gestión de eventos y propiedades en los componentes (Verificación de tipos y soporte de lenguaje para enlaces de host)',
      badge: 'Host',
      icon: '📦'
    },
    {
      key: 'extended-diagnostics' as ComponentType,
      label: 'Extended Diagnostics',
      description: 'Herramientas avanzadas de diagnóstico y análisis de rendimiento',
      badge: 'Diagnostics',
      icon: '🛠️'
    },
    {
      key: 'debug-panel' as ComponentType,
      label: 'Debug Panel',
      description: 'Panel de depuración con seguimiento de performance y métricas en tiempo real',
      badge: 'Debug',
      icon: '🐛'
    },
    {
      key: 'dynamic-component' as ComponentType,
      label: 'Dynamic Component',
      description: 'Creación dinámica de componentes usando las nuevas APIs de Angular 20',
      badge: 'Dynamic',
      icon: '⚡'
    },
    {
      key: 'exponential-operator' as ComponentType,
      label: 'Exponential Operator',
      description: 'Demostración del operador exponencial (**) en templates de Angular',
      badge: 'Math',
      icon: '📊'
    },
    {
      key: 'in-operator' as ComponentType,
      label: 'In Operator',
      description: 'Verificación de propiedades de objetos usando el operador "in"',
      badge: 'Logic',
      icon: '🔍'
    },
    {
      key: 'template-literals' as ComponentType,
      label: 'Template Literals',
      description: 'Template literals con interpolación avanzada y expresiones complejas',
      badge: 'String',
      icon: '📝'
    }
  ];

  // Método para cambiar el componente activo
  selectComponent(componentType: ComponentType): void {
    this.activeComponent.set(componentType);
  }

  // Computed para verificar si un componente está activo
  isActive = computed(() => (componentType: ComponentType) =>
    this.activeComponent() === componentType
  );

  // Computed para obtener información del componente activo
  activeComponentInfo = computed(() => {
    return this.menuOptions.find(option => option.key === this.activeComponent());
  });
}
