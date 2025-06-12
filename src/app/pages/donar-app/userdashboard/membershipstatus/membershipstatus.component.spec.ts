import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipstatusComponent } from './membershipstatus.component';

describe('MembershipstatusComponent', () => {
  let component: MembershipstatusComponent;
  let fixture: ComponentFixture<MembershipstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipstatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
