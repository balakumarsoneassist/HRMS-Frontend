import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationVisitingmemComponent } from './donation-visitingmem.component';

describe('DonationVisitingmemComponent', () => {
  let component: DonationVisitingmemComponent;
  let fixture: ComponentFixture<DonationVisitingmemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationVisitingmemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationVisitingmemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
