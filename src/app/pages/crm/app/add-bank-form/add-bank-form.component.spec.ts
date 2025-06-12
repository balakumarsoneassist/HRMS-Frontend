import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankFormComponent } from './add-bank-form.component';

describe('AddBankFormComponent', () => {
  let component: AddBankFormComponent;
  let fixture: ComponentFixture<AddBankFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBankFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBankFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
