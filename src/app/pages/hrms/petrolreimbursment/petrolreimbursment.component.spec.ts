import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolreimbursmentComponent } from './petrolreimbursment.component';

describe('PetrolreimbursmentComponent', () => {
  let component: PetrolreimbursmentComponent;
  let fixture: ComponentFixture<PetrolreimbursmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetrolreimbursmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetrolreimbursmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
