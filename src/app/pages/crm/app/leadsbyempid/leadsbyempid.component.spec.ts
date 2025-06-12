import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsbyempidComponent } from './leadsbyempid.component';

describe('LeadsbyempidComponent', () => {
  let component: LeadsbyempidComponent;
  let fixture: ComponentFixture<LeadsbyempidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsbyempidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsbyempidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
