import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donar-chart',
  imports: [CardModule,ChartModule,CommonModule],
  templateUrl: './donar-chart.component.html',
  styleUrl: './donar-chart.component.scss'
})
export class DonarChartComponent {
    ageGenderData: any;
    activeUsersData: any;
    placesConnectedData: any;

    // General Chart Options
    chartOptions: any;
    horizontalChartOptions: any;

    constructor() {
      // First Chart (Full Width)
      this.ageGenderData = {
        labels: ['18-24', '25-34', '35-44', '45-64', '65+'],
        datasets: [
          {
            label: 'Male',
            backgroundColor: '#6366F1',
            data: [500, 1500, 2500, 3500, 4500]
          },
          {
            label: 'Female',
            backgroundColor: '#D946EF',
            data: [600, 1400, 2600, 3400, 4600]
          }
        ]
      };

      // Second Chart - Active Users
      this.activeUsersData = {
        labels: ['2019', '2020', '2021', '2022'],
        datasets: [
          {
            label: 'Male',
            backgroundColor: '#6366F1',
            data: [2000000, 3100000, 3300000, 1500000]
          },
          {
            label: 'Female',
            backgroundColor: '#D946EF',
            data: [1800000, 2300000, 2900000, 1200000]
          }
        ]
      };

      // Third Chart - Places We Connected
      this.placesConnectedData = {
        labels: ['TN', 'Delhi', 'Kerala', 'Karnataka'],
        datasets: [
          {
            label: 'Connections',
            backgroundColor: ['#6366F1', '#D946EF', '#8B5CF6', '#22D3EE'],
            data: [80, 50, 65, 30]
          }
        ]
      };

      // General Chart Options
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#6b7280'
            },
            grid: {
              color: '#d1d5db'
            }
          },
          y: {
            ticks: {
              color: '#6b7280'
            },
            grid: {
              color: '#d1d5db'
            }
          }
        }
      };

      // Horizontal Bar Chart Options
      this.horizontalChartOptions = {
        indexAxis: 'y', // Horizontal bar chart
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#6b7280'
            },
            grid: {
              color: '#d1d5db'
            }
          },
          y: {
            ticks: {
              color: '#6b7280'
            },
            grid: {
              color: '#d1d5db'
            }
          }
        }
      };
    }
  }
