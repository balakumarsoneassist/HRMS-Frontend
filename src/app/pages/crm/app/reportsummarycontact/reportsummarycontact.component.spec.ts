import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsummarycontactComponent } from './reportsummarycontact.component';

describe('ReportsummarycontactComponent', () => {
  let component: ReportsummarycontactComponent;
  let fixture: ComponentFixture<ReportsummarycontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsummarycontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsummarycontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
