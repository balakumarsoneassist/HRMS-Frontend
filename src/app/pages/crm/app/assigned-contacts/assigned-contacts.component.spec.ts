import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedContactsComponent } from './assigned-contacts.component';

describe('AssignedContactsComponent', () => {
  let component: AssignedContactsComponent;
  let fixture: ComponentFixture<AssignedContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
