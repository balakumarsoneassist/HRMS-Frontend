import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnTrackLeadComponent } from './un-track-lead.component';

describe('UnTrackLeadComponent', () => {
  let component: UnTrackLeadComponent;
  let fixture: ComponentFixture<UnTrackLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnTrackLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnTrackLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
