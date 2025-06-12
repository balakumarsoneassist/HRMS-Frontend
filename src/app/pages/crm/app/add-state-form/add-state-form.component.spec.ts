import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStateFormComponent } from './add-state-form.component';

describe('AddStateFormComponent', () => {
  let component: AddStateFormComponent;
  let fixture: ComponentFixture<AddStateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
