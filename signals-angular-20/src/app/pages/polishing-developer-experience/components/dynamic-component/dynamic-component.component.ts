import { 
  Component, 
  ComponentRef, 
  createComponent, 
  inject, 
  inputBinding, 
  outputBinding, 
  signal, 
  twoWayBinding, 
  ViewContainerRef,
  EnvironmentInjector 
} from '@angular/core';
import { GenericComponentComponent } from '../generic-component/generic-component.component';

@Component({
  selector: 'app-dynamic-component',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-component.component.html',
  styleUrl: './dynamic-component.component.sass'
})
export class DynamicComponentComponent {
  private viewContainerRef = inject(ViewContainerRef);
  private environmentInjector = inject(EnvironmentInjector);

  canClose = signal(false);
  title = signal('Mi componente dinamico');

  dynamicComponents: ComponentRef<GenericComponentComponent>[] = [];

  createDynamicComponent() {
    // Crear componente dinámico usando createComponent
    const componentRef = createComponent(GenericComponentComponent, {
      environmentInjector: this.environmentInjector,
      hostElement: this.viewContainerRef.element.nativeElement,
      bindings: [
        // Bind del signal canClose al input canClose
        inputBinding('canClose', this.canClose),
        
        // Escuchar el evento onClose del componente
        outputBinding<string>('onClose', (result) => {
          console.log('Componente cerrado:', result);
          this.removeDynamicComponent(componentRef);
        }),
        
        // Two-way binding con la propiedad title
        twoWayBinding('title', this.title)
      ]
    });

    // Agregar el componente al ViewContainer
    this.viewContainerRef.insert(componentRef.hostView);
    this.dynamicComponents.push(componentRef);
  }

  removeDynamicComponent(componentRef: ComponentRef<GenericComponentComponent>) {
    const index = this.dynamicComponents.indexOf(componentRef);
    if (index > -1) {
      this.dynamicComponents.splice(index, 1);
      componentRef.destroy();
    }
  }

  toggleCanClose() {
    this.canClose.set(!this.canClose());
  }

  updateTitle() {
    this.title.set(`Título actualizado - ${new Date().toLocaleTimeString()}`);
  }

  clearAllComponents() {
    this.dynamicComponents.forEach(comp => comp.destroy());
    this.dynamicComponents = [];
    this.viewContainerRef.clear();
  }
}