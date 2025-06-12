import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDetailFormComponent } from './lead-detail-form.component';

describe('LeadDetailFormComponent', () => {
  let component: LeadDetailFormComponent;
  let fixture: ComponentFixture<LeadDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
