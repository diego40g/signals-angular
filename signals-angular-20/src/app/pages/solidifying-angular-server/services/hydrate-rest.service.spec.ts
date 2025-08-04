import { TestBed } from '@angular/core/testing';

import { HydrateRestService } from './hydrate-rest.service';

describe('HydrateRestService', () => {
  let service: HydrateRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HydrateRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
