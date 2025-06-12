import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustratingreportComponent } from './custratingreport.component';

describe('CustratingreportComponent', () => {
  let component: CustratingreportComponent;
  let fixture: ComponentFixture<CustratingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustratingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustratingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
