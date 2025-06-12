import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodedownloadComponent } from './qrcodedownload.component';

describe('QrcodedownloadComponent', () => {
  let component: QrcodedownloadComponent;
  let fixture: ComponentFixture<QrcodedownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodedownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodedownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
