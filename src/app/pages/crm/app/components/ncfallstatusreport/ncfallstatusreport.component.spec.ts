import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcfallstatusreportComponent } from './ncfallstatusreport.component';

describe('NcfallstatusreportComponent', () => {
  let component: NcfallstatusreportComponent;
  let fixture: ComponentFixture<NcfallstatusreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcfallstatusreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcfallstatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
