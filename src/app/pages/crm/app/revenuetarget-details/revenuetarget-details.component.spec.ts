import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuetargetDetailsComponent } from './revenuetarget-details.component';

describe('RevenuetargetDetailsComponent', () => {
  let component: RevenuetargetDetailsComponent;
  let fixture: ComponentFixture<RevenuetargetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenuetargetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuetargetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
