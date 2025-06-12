import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiloancustomersComponent } from './multiloancustomers.component';

describe('MultiloancustomersComponent', () => {
  let component: MultiloancustomersComponent;
  let fixture: ComponentFixture<MultiloancustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiloancustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiloancustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
