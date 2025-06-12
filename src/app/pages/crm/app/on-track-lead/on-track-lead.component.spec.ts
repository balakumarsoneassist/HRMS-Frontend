import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTrackLeadComponent } from './on-track-lead.component';

describe('OnTrackLeadComponent', () => {
  let component: OnTrackLeadComponent;
  let fixture: ComponentFixture<OnTrackLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnTrackLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnTrackLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
