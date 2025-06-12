import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTrackHistoryComponent } from './call-track-history.component';

describe('CallTrackHistoryComponent', () => {
  let component: CallTrackHistoryComponent;
  let fixture: ComponentFixture<CallTrackHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallTrackHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallTrackHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
