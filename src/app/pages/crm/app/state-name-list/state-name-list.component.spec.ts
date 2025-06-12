import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateNameListComponent } from './state-name-list.component';

describe('StateNameListComponent', () => {
  let component: StateNameListComponent;
  let fixture: ComponentFixture<StateNameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateNameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
