import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptActiveComponent } from './receipt-active.component';

describe('ReceiptActiveComponent', () => {
  let component: ReceiptActiveComponent;
  let fixture: ComponentFixture<ReceiptActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptActiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
