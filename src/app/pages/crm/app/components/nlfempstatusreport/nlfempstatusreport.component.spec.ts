import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfempstatusreportComponent } from './nlfempstatusreport.component';

describe('NlfempstatusreportComponent', () => {
  let component: NlfempstatusreportComponent;
  let fixture: ComponentFixture<NlfempstatusreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfempstatusreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfempstatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
