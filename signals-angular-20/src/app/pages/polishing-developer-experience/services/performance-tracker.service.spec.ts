import { TestBed } from '@angular/core/testing';

import { PerformanceTrackerService } from '../../polishing-developer-experience/services/performance-tracker.service';

describe('PerfomanceTrackerService', () => {
  let service: PerformanceTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
