import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvcustomerTrackEntryComponent } from './svcustomer-track-entry.component';

describe('SvcustomerTrackEntryComponent', () => {
  let component: SvcustomerTrackEntryComponent;
  let fixture: ComponentFixture<SvcustomerTrackEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvcustomerTrackEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvcustomerTrackEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
