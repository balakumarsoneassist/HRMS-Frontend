import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustservicecallFreqComponent } from './custservicecall-freq.component';

describe('CustservicecallFreqComponent', () => {
  let component: CustservicecallFreqComponent;
  let fixture: ComponentFixture<CustservicecallFreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustservicecallFreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustservicecallFreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
