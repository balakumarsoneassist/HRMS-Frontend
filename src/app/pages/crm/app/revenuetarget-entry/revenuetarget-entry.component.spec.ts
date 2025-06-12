import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuetargetEntryComponent } from './revenuetarget-entry.component';

describe('RevenuetargetEntryComponent', () => {
  let component: RevenuetargetEntryComponent;
  let fixture: ComponentFixture<RevenuetargetEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenuetargetEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuetargetEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
