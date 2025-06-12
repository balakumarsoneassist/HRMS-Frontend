import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustratingdetailreportComponent } from './custratingdetailreport.component';

describe('CustratingdetailreportComponent', () => {
  let component: CustratingdetailreportComponent;
  let fixture: ComponentFixture<CustratingdetailreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustratingdetailreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustratingdetailreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
