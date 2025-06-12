import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistloanwisecustomersComponent } from './existloanwisecustomers.component';

describe('ExistloanwisecustomersComponent', () => {
  let component: ExistloanwisecustomersComponent;
  let fixture: ComponentFixture<ExistloanwisecustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistloanwisecustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistloanwisecustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
