import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuetargetListComponent } from './revenuetarget-list.component';

describe('RevenuetargetListComponent', () => {
  let component: RevenuetargetListComponent;
  let fixture: ComponentFixture<RevenuetargetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenuetargetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuetargetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
