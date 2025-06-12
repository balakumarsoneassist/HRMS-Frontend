import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConnectorFormComponent } from './add-connector-form.component';

describe('AddConnectorFormComponent', () => {
  let component: AddConnectorFormComponent;
  let fixture: ComponentFixture<AddConnectorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConnectorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConnectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
