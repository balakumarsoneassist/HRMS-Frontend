import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationNameListComponent } from './location-name-list.component';

describe('LocationNameListComponent', () => {
  let component: LocationNameListComponent;
  let fixture: ComponentFixture<LocationNameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationNameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
