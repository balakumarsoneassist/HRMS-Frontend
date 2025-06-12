import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustservicetrackEntryComponent } from './custservicetrack-entry.component';

describe('CustservicetrackEntryComponent', () => {
  let component: CustservicetrackEntryComponent;
  let fixture: ComponentFixture<CustservicetrackEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustservicetrackEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustservicetrackEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
