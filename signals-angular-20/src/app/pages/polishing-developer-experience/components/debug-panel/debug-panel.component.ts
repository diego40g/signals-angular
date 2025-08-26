import { Component, OnInit, OnDestroy } from '@angular/core';
import { PerfomanceTrackerService } from '@app/pages/polishing-developer-experience/services/perfomance-tracker.service';
import { ListItem } from '../../models/list-item';
import { FormData } from '../../models/form-data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debug-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './debug-panel.component.html',
  styleUrl: './debug-panel.component.sass'
})
export class DebugPanelComponent implements OnInit, OnDestroy {
  showMetrics = true;
  formData: FormData = {
    userName: '',
    userEmail: ''
  };
  listItems: ListItem[] = [
    { id: 1, name: 'Elemento uno' },
    { id: 2, name: 'Elemento dos' },
    { id: 3, name: 'Elemento tres' },
    { id: 4, name: 'Elemento cuatro' },
    { id: 5, name: 'Elemento cinco' },
    { id: 6, name: 'Elemento seis' },
    { id: 7, name: 'Elemento siete' },
    { id: 8, name: 'Elemento ocho' },
    { id: 9, name: 'Elemento nueve' },
    { id: 10, name: 'Elemento diez' }
  ];
  
  private componentStartTime = performance.now();

  constructor(private tracker: PerfomanceTrackerService) {}

  ngOnInit(): void {
    const initTime = performance.now() - this.componentStartTime;
    this.tracker.trackEvent('Component Init', {
      component: 'DebugPanelComponent',
      initTime: `${initTime.toFixed(2)}ms`
    });
  }

  ngOnDestroy(): void {
    this.tracker.trackEvent('Component Destroy', {
      component: 'DebugPanelComponent',
      timeAlive: `${(performance.now() - this.componentStartTime).toFixed(2)}ms`
    });
  }

  onButtonClick() {
    this.tracker.trackEvent('Button Click', { 
      action: 'user-interaction',
      button: 'primary-track-button',
      timestamp: new Date().toISOString()
    });
  }

  onSpecialAction() {
    this.tracker.trackEvent('Special Action', {
      action: 'special-user-interaction',
      button: 'secondary-track-button',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  }

  onInputFocus(fieldName: string) {
    this.tracker.trackEvent('Input Focus', {
      field: fieldName,
      action: 'form-interaction',
      focusTime: new Date().toISOString()
    });
  }

  onInputBlur(fieldName: string) {
    const value = fieldName === 'userName' ? this.formData.userName : this.formData.userEmail;
    this.tracker.trackEvent('Input Blur', {
      field: fieldName,
      action: 'form-interaction',
      hasValue: !!value,
      valueLength: value.length,
      blurTime: new Date().toISOString()
    });
  }

  onFormSubmit() {
    this.tracker.trackEvent('Form Submit', {
      action: 'form-submission',
      formData: {
        hasName: !!this.formData.userName,
        hasEmail: !!this.formData.userEmail,
        nameLength: this.formData.userName.length,
        emailValid: this.isValidEmail(this.formData.userEmail)
      },
      submitTime: new Date().toISOString()
    });
  }

  onListItemClick(item: ListItem, index: number) {
    this.tracker.trackEvent('List Item Click', {
      action: 'list-interaction',
      itemId: item.id,
      itemName: item.name,
      itemIndex: index,
      clickTime: new Date().toISOString()
    });
  }

  onListScroll(event: Event) {
    const target = event.target as HTMLElement;
    this.tracker.trackEvent('List Scroll', {
      action: 'scroll-interaction',
      scrollTop: target.scrollTop,
      scrollHeight: target.scrollHeight,
      clientHeight: target.clientHeight,
      scrollPercentage: ((target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100).toFixed(2)
    });
  }

  toggleMetrics() {
    this.showMetrics = !this.showMetrics;
    this.tracker.trackEvent('Toggle Metrics View', {
      action: 'ui-interaction',
      newState: this.showMetrics ? 'visible' : 'hidden'
    });
  }

  viewAllMetrics() {
    const metrics = this.tracker.getMetrics();
    console.table(metrics);
    this.tracker.trackEvent('View All Metrics', {
      action: 'debug-interaction',
      totalMetrics: metrics.length
    });
  }

  clearAllMetrics() {
    const previousCount = this.tracker.getMetrics().length;
    this.tracker.clearMetrics();
    console.log(`Cleared ${previousCount} metrics from tracker`);
    
    // Trackear la acción de limpiar (este será el primer evento después del clear)
    this.tracker.trackEvent('Clear All Metrics', {
      action: 'debug-interaction',
      clearedCount: previousCount
    });
  }

  exportMetrics() {
    const metrics = this.tracker.getMetrics();
    console.log('📊 Custom Tracker Metrics Export:');
    console.log('=====================================');
    metrics.forEach((metric, index) => {
      console.log(`${index + 1}. ${metric.name}:`, metric);
    });
    console.log('=====================================');
    
    this.tracker.trackEvent('Export Metrics', {
      action: 'debug-interaction',
      exportedCount: metrics.length,
      exportTime: new Date().toISOString()
    });
  }

  getTotalEvents(): number {
    return this.tracker.getMetrics().length;
  }

  getLastEvent(): any {
    const metrics = this.tracker.getMetrics();
    return metrics.length > 0 ? metrics[metrics.length - 1] : null;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
