import { TestBed } from '@angular/core/testing';

import { SmssService } from './smss.service';

describe('SmssService', () => {
  let service: SmssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
