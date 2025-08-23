import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolApprovalComponent } from './petrol-approval.component';

describe('PetrolApprovalComponent', () => {
  let component: PetrolApprovalComponent;
  let fixture: ComponentFixture<PetrolApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetrolApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetrolApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
