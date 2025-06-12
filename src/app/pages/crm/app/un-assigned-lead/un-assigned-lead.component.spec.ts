import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAssignedLeadComponent } from './un-assigned-lead.component';

describe('UnAssignedLeadComponent', () => {
  let component: UnAssignedLeadComponent;
  let fixture: ComponentFixture<UnAssignedLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAssignedLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAssignedLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
