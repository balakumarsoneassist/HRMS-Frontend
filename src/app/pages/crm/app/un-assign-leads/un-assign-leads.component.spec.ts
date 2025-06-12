import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAssignLeadsComponent } from './un-assign-leads.component';

describe('UnAssignLeadsComponent', () => {
  let component: UnAssignLeadsComponent;
  let fixture: ComponentFixture<UnAssignLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAssignLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAssignLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
