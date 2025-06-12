import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustservicetrackHistoryComponent } from './custservicetrack-history.component';

describe('CustservicetrackHistoryComponent', () => {
  let component: CustservicetrackHistoryComponent;
  let fixture: ComponentFixture<CustservicetrackHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustservicetrackHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustservicetrackHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
