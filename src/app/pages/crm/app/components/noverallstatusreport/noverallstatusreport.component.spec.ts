import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoverallstatusreportComponent } from './noverallstatusreport.component';

describe('NoverallstatusreportComponent', () => {
  let component: NoverallstatusreportComponent;
  let fixture: ComponentFixture<NoverallstatusreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoverallstatusreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoverallstatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
