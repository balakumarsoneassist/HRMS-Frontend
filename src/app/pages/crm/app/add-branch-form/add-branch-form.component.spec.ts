import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBranchFormComponent } from './add-branch-form.component';

describe('AddBranchFormComponent', () => {
  let component: AddBranchFormComponent;
  let fixture: ComponentFixture<AddBranchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBranchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBranchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
