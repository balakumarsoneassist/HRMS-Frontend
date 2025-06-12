import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBajajFormComponent } from './add-bajaj-form.component';

describe('AddBajajFormComponent', () => {
  let component: AddBajajFormComponent;
  let fixture: ComponentFixture<AddBajajFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBajajFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBajajFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
