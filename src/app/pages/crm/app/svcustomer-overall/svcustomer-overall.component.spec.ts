import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvcustomerOverallComponent } from './svcustomer-overall.component';

describe('SvcustomerOverallComponent', () => {
  let component: SvcustomerOverallComponent;
  let fixture: ComponentFixture<SvcustomerOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvcustomerOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvcustomerOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
