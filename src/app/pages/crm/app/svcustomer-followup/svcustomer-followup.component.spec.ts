import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvcustomerFollowupComponent } from './svcustomer-followup.component';

describe('SvcustomerFollowupComponent', () => {
  let component: SvcustomerFollowupComponent;
  let fixture: ComponentFixture<SvcustomerFollowupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvcustomerFollowupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvcustomerFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
