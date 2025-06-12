import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorTrackHistoryComponent } from './connector-track-history.component';

describe('ConnectorTrackHistoryComponent', () => {
  let component: ConnectorTrackHistoryComponent;
  let fixture: ComponentFixture<ConnectorTrackHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectorTrackHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorTrackHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
