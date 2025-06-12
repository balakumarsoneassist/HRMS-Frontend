import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuetargetAchivementComponent } from './revenuetarget-achivement.component';

describe('RevenuetargetAchivementComponent', () => {
  let component: RevenuetargetAchivementComponent;
  let fixture: ComponentFixture<RevenuetargetAchivementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenuetargetAchivementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuetargetAchivementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
