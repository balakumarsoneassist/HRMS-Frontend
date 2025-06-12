import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonarChartComponent } from './donar-chart.component';

describe('DonarChartComponent', () => {
  let component: DonarChartComponent;
  let fixture: ComponentFixture<DonarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
