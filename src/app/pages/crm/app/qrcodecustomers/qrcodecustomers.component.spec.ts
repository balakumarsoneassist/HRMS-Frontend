import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodecustomersComponent } from './qrcodecustomers.component';

describe('QrcodecustomersComponent', () => {
  let component: QrcodecustomersComponent;
  let fixture: ComponentFixture<QrcodecustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodecustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodecustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
