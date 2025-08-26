import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-host-bindings',
  standalone: true,
  imports: [],
  templateUrl: './host-bindings.component.html',
  styleUrl: './host-bindings.component.sass',
  host: {
    // Bindings con verificación de tipos
    '[class.active]': 'isActive()',
    '[class.disabled]': 'isDisabled()',
    '[class.theme-dark]': 'isDarkTheme()',
    '[attr.title]': 'getAppTitle()',
    '[attr.data-status]': 'getStatusAttribute()',
    '[style.background-color]': 'getBackgroundColor()',
    '[style.border-width.px]': 'getBorderWidth()',
    '[style.color]': 'getTextColor()',
    '[style.fontSize]': 'getFontSize()',
    '[style.opacity]': 'getOpacity()',
    '[attr.aria-label]': 'getAriaLabel()',

    // Event listeners con verificación de tipos
    '(mouseenter)': 'onMouseEnter($event)',
    '(mouseleave)': 'onMouseLeave($event)',
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeyDown($event)'
  }
})
export class HostBindingsComponent {
  // Signals para el estado del componente
  private activeState = signal(false);
  private disabledState = signal(false);
  private themeState = signal<'light' | 'dark'>('light');
  private hoverState = signal(false);

  eventMessage = signal<string>('Ningún evento aún');

  // Computed properties con verificación de tipos
  isActive = computed(() => this.activeState());
  isDisabled = computed(() => this.disabledState());
  isDarkTheme = computed(() => this.themeState() === 'dark');

  statusMessage = computed(() => {
    if (this.isDisabled()) return 'Deshabilitado';
    if (this.isActive()) return 'Activo';
    return 'Inactivo';
  });

  appliedClasses = computed(() => {
    const classes = [];
    if (this.isActive()) classes.push('active');
    if (this.isDisabled()) classes.push('disabled');
    if (this.isDarkTheme()) classes.push('theme-dark');
    if (this.hoverState()) classes.push('hover');
    return classes.join(', ') || 'ninguna';
  });

  // ✅ Métodos con verificación de tipos para host bindings
  getAppTitle(): string {
    // Devuelve un título dinámico según el estado
    if (this.isDisabled()) return 'Componente deshabilitado';
    if (this.isActive()) return 'Componente activo';
    return 'Componente inactivo';
  }

  // ✅ Métodos con verificación de tipos para host bindings
  getStatusAttribute(): string {
    return this.statusMessage().toLowerCase();
  }

  getBackgroundColor(): string {
    if (this.isDisabled()) return '#f5f5f5';
    if (this.isActive()) return '#e8f5e8';
    if (this.isDarkTheme()) return '#2d2d2d';
    return '#ffffff';
  }

  getBorderWidth(): number {
    if (this.isActive()) return 3;
    if (this.hoverState()) return 2;
    return 1;
  }

  // ✅ Event handlers con verificación de tipos
  onMouseEnter(event: MouseEvent): void {
    this.hoverState.set(true);
    this.eventMessage.set('Mouse entró');
    console.log('Mouse enter:', event.type);
  }

  onMouseLeave(event: MouseEvent): void {
    this.hoverState.set(false);
    this.eventMessage.set('Mouse salió');
    console.log('Mouse leave:', event.type);
  }

  onClick(event: MouseEvent): void {
    if (!this.isDisabled()) {
      this.eventMessage.set('Dio un click');
      console.log('Click event:', event.button);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    console.log(event.key);

    if (event.key === 'Enter') {
      event.preventDefault();
      this.toggleActive();
      this.eventMessage.set(`Presionó una tecla: ${event.key}`);
    }
  }

  // Métodos públicos para controles
  toggleActive(): void {
    this.activeState.update(current => !current);
  }

  toggleDisabled(): void {
    this.disabledState.update(current => !current);
  }

  changeTheme(): void {
    this.themeState.update(current => current === 'light' ? 'dark' : 'light');
  }

  getTextColor(): string {
    if(this.isDisabled()) return '#b0b0b0';
    if(this.isActive()) return '#388e3c';
    if(this.isDarkTheme()) return '#fafafa';
    return '#222';
  }

  getFontSize(): string {
    return this.isActive() ? '1.5rem' : '1rem';
  }

  getOpacity(): number {
    return this.isDisabled() ? 0.5 : 1;
  }

  getAriaLabel(): string {
    return this.getAppTitle();
  }
}
