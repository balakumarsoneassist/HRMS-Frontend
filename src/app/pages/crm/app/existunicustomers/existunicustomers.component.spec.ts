import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistunicustomersComponent } from './existunicustomers.component';

describe('ExistunicustomersComponent', () => {
  let component: ExistunicustomersComponent;
  let fixture: ComponentFixture<ExistunicustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistunicustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistunicustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
