import { TestBed } from '@angular/core/testing';

import { LeadtrackService } from './leadtrack.service';

describe('LeadtrackService', () => {
  let service: LeadtrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadtrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
