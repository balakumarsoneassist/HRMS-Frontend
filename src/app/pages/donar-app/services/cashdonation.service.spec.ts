import { TestBed } from '@angular/core/testing';

import { CashDonationService } from './cashdonation.service';

describe('CashdonationService', () => {
  let service: CashDonationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashDonationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
