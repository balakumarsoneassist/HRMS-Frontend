import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCashComponent } from './donation-cash.component';

describe('DonationCashComponent', () => {
  let component: DonationCashComponent;
  let fixture: ComponentFixture<DonationCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationCashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
