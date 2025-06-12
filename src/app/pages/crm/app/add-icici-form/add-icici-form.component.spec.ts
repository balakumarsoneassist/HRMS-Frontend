import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIciciFormComponent } from './add-icici-form.component';

describe('AddIciciFormComponent', () => {
  let component: AddIciciFormComponent;
  let fixture: ComponentFixture<AddIciciFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIciciFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIciciFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
