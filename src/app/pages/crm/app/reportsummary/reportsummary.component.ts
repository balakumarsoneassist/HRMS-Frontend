import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Chart, registerables } from 'chart.js';
import { ReportService } from '../services/report/reportservice';
import { DailyReportSummaryModel, SummaryRepInModel } from '../model/report/dailyreport';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-reportsummary',
  standalone: true,
   templateUrl: './reportsummary.component.html',
  styleUrls: ['./reportsummary.component.css'],
  imports: [
    CommonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    ToastModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [MessageService]
})
export class ReportsummaryComponent implements OnInit {
  reportForm!: FormGroup;
  model: DailyReportSummaryModel[] = [];
  chart!: Chart;
  displayChart = false;
  loading = false;

  xData: any[] = [];
  yDataTL: any[] = [];
  yDataTC: any[] = [];
  yDataAC: any[] = [];
  yDataRC: any[] = [];
  yDataPC: any[] = [];

  constructor(
    private fb: FormBuilder,
    private repService: ReportService,
    private messageService: MessageService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.reportForm = this.fb.group({
      date: [null, Validators.required]
    });
  }

  getSReport() {
    if (this.reportForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation',
        detail: 'Please select a date'
      });
      return;
    }

    const req: SummaryRepInModel = {
      flag: 'admin',
      stDate: this.reportForm.value.date
    };

    this.loading = true;

    this.repService.getDailyReportSummary(req).subscribe({
      next: (response) => {
        this.loading = false;
        this.model = response;
        this.prepareChartData();
        this.displayChart = true;
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Server Error'
        });
        console.error(err);
      }
    });
  }

  prepareChartData() {
    this.xData = this.model.map(item => item.Name);
    this.yDataTL = this.model.map(item => item.TotalLeadDayCount);
    this.yDataTC = this.model.map(item => item.TotalCallDayCount);
    this.yDataAC = this.model.map(item => item.AttendCallDayCount);
    this.yDataRC = this.model.map(item => item.RejectCallDayCount);
    this.yDataPC = this.model.map(item => item.PendingCallDayCount);

    if (this.chart) this.chart.destroy();

    this.chart = new Chart('line-chart', {
      type: 'bar',
      data: {
        labels: this.xData,
        datasets: [
          { label: 'TotalLeadDayCount', data: this.yDataTL, backgroundColor: '#8e5ea2' },
          { label: 'TotalCallDayCount', data: this.yDataTC, backgroundColor: '#3e95cd' },
          { label: 'AttendCallDayCount', data: this.yDataAC, backgroundColor: 'green' },
          { label: 'RejectCallDayCount', data: this.yDataRC, backgroundColor: 'red' },
          { label: 'PendingCallDayCount', data: this.yDataPC, backgroundColor: '#c4a350' }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        },
        layout: { padding: 20 }
      }
    });
  }
}
