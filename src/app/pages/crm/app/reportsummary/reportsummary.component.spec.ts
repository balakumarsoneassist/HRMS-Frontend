import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsummaryComponent } from './reportsummary.component';

describe('ReportsummaryComponent', () => {
  let component: ReportsummaryComponent;
  let fixture: ComponentFixture<ReportsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
