import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnreviewComponent } from './onreview.component';

describe('OnreviewComponent', () => {
  let component: OnreviewComponent;
  let fixture: ComponentFixture<OnreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
