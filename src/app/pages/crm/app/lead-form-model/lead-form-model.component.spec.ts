import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadFormModelComponent } from './lead-form-model.component';

describe('LeadFormModelComponent', () => {
  let component: LeadFormModelComponent;
  let fixture: ComponentFixture<LeadFormModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadFormModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadFormModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
