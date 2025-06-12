import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcfempstatusreportComponent } from './ncfempstatusreport.component';

describe('NcfempstatusreportComponent', () => {
  let component: NcfempstatusreportComponent;
  let fixture: ComponentFixture<NcfempstatusreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcfempstatusreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcfempstatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
