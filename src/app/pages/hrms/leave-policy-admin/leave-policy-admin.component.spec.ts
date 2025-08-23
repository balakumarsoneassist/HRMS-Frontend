import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePolicyAdminComponent } from './leave-policy-admin.component';

describe('LeavePolicyAdminComponent', () => {
  let component: LeavePolicyAdminComponent;
  let fixture: ComponentFixture<LeavePolicyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeavePolicyAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavePolicyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
