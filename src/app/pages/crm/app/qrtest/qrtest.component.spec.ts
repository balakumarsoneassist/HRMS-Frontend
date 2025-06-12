import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrtestComponent } from './qrtest.component';

describe('QrtestComponent', () => {
  let component: QrtestComponent;
  let fixture: ComponentFixture<QrtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
