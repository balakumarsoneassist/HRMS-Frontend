import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadFollowUpFormComponent } from './lead-follow-up-form.component';

describe('LeadFollowUpFormComponent', () => {
  let component: LeadFollowUpFormComponent;
  let fixture: ComponentFixture<LeadFollowUpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadFollowUpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadFollowUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
