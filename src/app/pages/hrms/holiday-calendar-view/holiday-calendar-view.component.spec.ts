import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayCalendarViewComponent } from './holiday-calendar-view.component';

describe('HolidayCalendarViewComponent', () => {
  let component: HolidayCalendarViewComponent;
  let fixture: ComponentFixture<HolidayCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayCalendarViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
