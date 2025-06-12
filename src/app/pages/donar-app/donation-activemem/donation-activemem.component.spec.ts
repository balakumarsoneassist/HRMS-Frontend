import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationActivememComponent } from './donation-activemem.component';

describe('DonationActivememComponent', () => {
  let component: DonationActivememComponent;
  let fixture: ComponentFixture<DonationActivememComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationActivememComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationActivememComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
