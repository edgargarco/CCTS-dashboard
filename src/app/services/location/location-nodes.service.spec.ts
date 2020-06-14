import { TestBed } from '@angular/core/testing';

import { LocationNodesService } from './location-nodes.service';

describe('LocationNodesService', () => {
  let service: LocationNodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationNodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
