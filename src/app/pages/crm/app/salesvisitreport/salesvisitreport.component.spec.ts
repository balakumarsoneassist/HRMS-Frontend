import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesvisitreportComponent } from './salesvisitreport.component';

describe('SalesvisitreportComponent', () => {
  let component: SalesvisitreportComponent;
  let fixture: ComponentFixture<SalesvisitreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesvisitreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesvisitreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
