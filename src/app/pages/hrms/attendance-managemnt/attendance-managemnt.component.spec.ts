import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceManagemntComponent } from './attendance-managemnt.component';

describe('AttendanceManagemntComponent', () => {
  let component: AttendanceManagemntComponent;
  let fixture: ComponentFixture<AttendanceManagemntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceManagemntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceManagemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
