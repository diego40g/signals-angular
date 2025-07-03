import { Component, computed, inject, signal, resource } from '@angular/core';
import { DataStreamComponent } from './components/data-stream/data-stream.component';
import { HttpResourceComponent } from './components/http-resource/http-resource.component';
import { ResourceComponent } from './components/resource/resource.component';

// Define el tipo para los componentes
type ComponentType = 'resource' | 'data-stream' | 'http-resource';

@Component({
  selector: 'app-new-experimental-apis',
  standalone: true,
  imports: [DataStreamComponent,  ResourceComponent, HttpResourceComponent],
  templateUrl: './new-experimental-apis.component.html',
  styleUrl: './new-experimental-apis.component.sass'
})
export class NewExperimentalApisComponent {
  // Signal para el componente activo
  public activeComponent = signal<ComponentType>('resource');

  // Opciones del menú
  public menuOptions = [
    { 
      key: 'resource' as ComponentType, 
      label: 'Resource API', 
      description: 'Ejemplo básico de resource con HTTP requests',
      badge: 'Basic'
    },
    { 
      key: 'data-stream' as ComponentType, 
      label: 'Data Stream', 
      description: 'Streaming de datos con WebSocket simulation',
      badge: 'Stream'
    },
    { 
      key: 'http-resource' as ComponentType, 
      label: 'HTTP Resource', 
      description: 'Resource avanzado con manejo de HTTP',
      badge: 'HTTP'
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
}