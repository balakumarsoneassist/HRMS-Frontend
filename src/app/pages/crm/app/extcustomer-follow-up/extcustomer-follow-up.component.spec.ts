import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtcustomerFollowUpComponent } from './extcustomer-follow-up.component';

describe('ExtcustomerFollowUpComponent', () => {
  let component: ExtcustomerFollowUpComponent;
  let fixture: ComponentFixture<ExtcustomerFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtcustomerFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtcustomerFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
