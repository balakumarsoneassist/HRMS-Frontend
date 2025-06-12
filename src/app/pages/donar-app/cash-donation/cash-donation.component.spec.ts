import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDonationComponent } from './cash-donation.component';

describe('CashDonationComponent', () => {
  let component: CashDonationComponent;
  let fixture: ComponentFixture<CashDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashDonationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
