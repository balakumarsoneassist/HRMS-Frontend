import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedContactsComponent } from './unassigned-contacts.component';

describe('UnassignedContactsComponent', () => {
  let component: UnassignedContactsComponent;
  let fixture: ComponentFixture<UnassignedContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignedContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
