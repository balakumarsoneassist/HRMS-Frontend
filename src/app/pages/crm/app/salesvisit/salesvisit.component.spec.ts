import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesvisitComponent } from './salesvisit.component';

describe('SalesvisitComponent', () => {
  let component: SalesvisitComponent;
  let fixture: ComponentFixture<SalesvisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesvisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
