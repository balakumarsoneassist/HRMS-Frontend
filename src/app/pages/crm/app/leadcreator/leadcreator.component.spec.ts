import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadcreatorComponent } from './leadcreator.component';

describe('LeadcreatorComponent', () => {
  let component: LeadcreatorComponent;
  let fixture: ComponentFixture<LeadcreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadcreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
