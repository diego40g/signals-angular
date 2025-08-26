import { TestBed } from '@angular/core/testing';

import { PerfomanceTrackerService } from '../../polishing-developer-experience/services/perfomance-tracker.service';

describe('PerfomanceTrackerService', () => {
  let service: PerfomanceTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfomanceTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
