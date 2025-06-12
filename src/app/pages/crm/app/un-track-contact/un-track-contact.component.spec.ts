import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnTrackContactComponent } from './un-track-contact.component';

describe('UnTrackContactComponent', () => {
  let component: UnTrackContactComponent;
  let fixture: ComponentFixture<UnTrackContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnTrackContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnTrackContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
