import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustservicetrackComponent } from './custservicetrack.component';

describe('CustservicetrackComponent', () => {
  let component: CustservicetrackComponent;
  let fixture: ComponentFixture<CustservicetrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustservicetrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustservicetrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
