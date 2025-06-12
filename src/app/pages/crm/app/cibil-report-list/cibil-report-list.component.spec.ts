import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CibilReportListComponent } from './cibil-report-list.component';

describe('CibilReportListComponent', () => {
  let component: CibilReportListComponent;
  let fixture: ComponentFixture<CibilReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CibilReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CibilReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
