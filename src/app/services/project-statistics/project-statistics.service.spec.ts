import { TestBed } from '@angular/core/testing';

import { ProjectStatisticsService } from './project-statistics.service';

describe('ProjectStatisticsService', () => {
  let service: ProjectStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
