import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesvisitentryComponent } from './salesvisitentry.component';

describe('SalesvisitentryComponent', () => {
  let component: SalesvisitentryComponent;
  let fixture: ComponentFixture<SalesvisitentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesvisitentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesvisitentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
