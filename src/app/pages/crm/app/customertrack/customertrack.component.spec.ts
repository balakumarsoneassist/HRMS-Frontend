import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomertrackComponent } from './customertrack.component';

describe('CustomertrackComponent', () => {
  let component: CustomertrackComponent;
  let fixture: ComponentFixture<CustomertrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomertrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomertrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
