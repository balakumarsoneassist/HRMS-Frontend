import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueproductMasterComponent } from './revenueproduct-master.component';

describe('RevenueproductMasterComponent', () => {
  let component: RevenueproductMasterComponent;
  let fixture: ComponentFixture<RevenueproductMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueproductMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueproductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
