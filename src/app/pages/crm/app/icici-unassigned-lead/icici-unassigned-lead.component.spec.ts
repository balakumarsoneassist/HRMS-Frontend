import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IciciUnassignedLeadComponent } from './icici-unassigned-lead.component';

describe('IciciUnassignedLeadComponent', () => {
  let component: IciciUnassignedLeadComponent;
  let fixture: ComponentFixture<IciciUnassignedLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IciciUnassignedLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IciciUnassignedLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
