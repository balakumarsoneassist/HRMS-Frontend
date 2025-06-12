import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiloancustomersdetComponent } from './multiloancustomersdet.component';

describe('MultiloancustomersdetComponent', () => {
  let component: MultiloancustomersdetComponent;
  let fixture: ComponentFixture<MultiloancustomersdetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiloancustomersdetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiloancustomersdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
