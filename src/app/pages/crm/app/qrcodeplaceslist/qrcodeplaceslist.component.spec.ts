import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeplaceslistComponent } from './qrcodeplaceslist.component';

describe('QrcodeplaceslistComponent', () => {
  let component: QrcodeplaceslistComponent;
  let fixture: ComponentFixture<QrcodeplaceslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeplaceslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeplaceslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
