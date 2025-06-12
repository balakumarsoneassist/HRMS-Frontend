import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipReceiptComponent } from './membership-receipt.component';

describe('MembershipReceiptComponent', () => {
  let component: MembershipReceiptComponent;
  let fixture: ComponentFixture<MembershipReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
