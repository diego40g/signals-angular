import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerformanceTrackerService {
  private metrics: any[] = [];

  trackEvent(name: string, data?: any) {
    const timestamp = performance.now();
    const event = {
      name,
      timestamp,
      data,
      url: window.location.href
    };

    this.metrics.push(event);
    console.log('Custom Tracker Event: ', event);

    (window as any).customTracker = this.metrics;
  }

  getMetrics() {
    return this.metrics;
  }

  clearMetrics() {
    this.metrics = [];
  }
}
