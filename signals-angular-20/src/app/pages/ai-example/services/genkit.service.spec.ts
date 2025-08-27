import { TestBed } from '@angular/core/testing';

import { GenkitService } from './genkit.service';

describe('GenkitService', () => {
  let service: GenkitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenkitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
