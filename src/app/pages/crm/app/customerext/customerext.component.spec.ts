import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerextComponent } from './customerext.component';

describe('CustomerextComponent', () => {
  let component: CustomerextComponent;
  let fixture: ComponentFixture<CustomerextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
