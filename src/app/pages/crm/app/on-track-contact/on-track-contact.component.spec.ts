import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTrackContactComponent } from './on-track-contact.component';

describe('OnTrackContactComponent', () => {
  let component: OnTrackContactComponent;
  let fixture: ComponentFixture<OnTrackContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnTrackContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnTrackContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
