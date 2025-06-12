import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtcustomerTrackHistoryComponent } from './extcustomer-track-history.component';

describe('ExtcustomerTrackHistoryComponent', () => {
  let component: ExtcustomerTrackHistoryComponent;
  let fixture: ComponentFixture<ExtcustomerTrackHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtcustomerTrackHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtcustomerTrackHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
