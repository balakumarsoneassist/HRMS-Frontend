import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueproductListComponent } from './revenueproduct-list.component';

describe('RevenueproductListComponent', () => {
  let component: RevenueproductListComponent;
  let fixture: ComponentFixture<RevenueproductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueproductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueproductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
