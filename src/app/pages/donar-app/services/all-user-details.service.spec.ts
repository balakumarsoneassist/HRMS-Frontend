import { TestBed } from '@angular/core/testing';

import { AllUserDetailsService } from './all-user-details.service';

describe('AllUserDetailsService', () => {
  let service: AllUserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllUserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
