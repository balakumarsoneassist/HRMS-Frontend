import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeplacesComponent } from './qrcodeplaces.component';

describe('QrcodeplacesComponent', () => {
  let component: QrcodeplacesComponent;
  let fixture: ComponentFixture<QrcodeplacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeplacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeplacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
