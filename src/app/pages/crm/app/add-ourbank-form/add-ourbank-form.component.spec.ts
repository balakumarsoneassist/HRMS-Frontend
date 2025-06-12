import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOurbankFormComponent } from './add-ourbank-form.component';

describe('AddOurbankFormComponent', () => {
  let component: AddOurbankFormComponent;
  let fixture: ComponentFixture<AddOurbankFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOurbankFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOurbankFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
