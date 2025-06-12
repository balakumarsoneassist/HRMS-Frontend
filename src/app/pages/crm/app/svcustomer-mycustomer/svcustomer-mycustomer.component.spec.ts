import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvcustomerMycustomerComponent } from './svcustomer-mycustomer.component';

describe('SvcustomerMycustomerComponent', () => {
  let component: SvcustomerMycustomerComponent;
  let fixture: ComponentFixture<SvcustomerMycustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvcustomerMycustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvcustomerMycustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
