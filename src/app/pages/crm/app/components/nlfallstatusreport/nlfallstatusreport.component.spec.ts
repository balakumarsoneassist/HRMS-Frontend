import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfallstatusreportComponent } from './nlfallstatusreport.component';

describe('NlfallstatusreportComponent', () => {
  let component: NlfallstatusreportComponent;
  let fixture: ComponentFixture<NlfallstatusreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfallstatusreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfallstatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
