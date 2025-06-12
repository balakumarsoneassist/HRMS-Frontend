import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationTotalComponent } from './donation-total.component';

describe('DonationTotalComponent', () => {
  let component: DonationTotalComponent;
  let fixture: ComponentFixture<DonationTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationTotalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
