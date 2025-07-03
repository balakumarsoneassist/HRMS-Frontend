import { Component, OnInit } from '@angular/core';
import { DailyReportSummaryModel, SummaryRepInModel } from '../model/report/dailyreport';
import { ReportService } from '../services/report/reportservice';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-reportsummarycontact',
  standalone: true,
  templateUrl: './reportsummarycontact.component.html',
  styleUrls: ['./reportsummarycontact.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    ToastModule,
    ButtonModule,
    TableModule
  ]
})
export class ReportsummarycontactComponent implements OnInit {
  selDt: string = '';
  model: DailyReportSummaryModel[] = [];
  resList: DailyReportSummaryModel[] = [];
  dvdisp = 'display:none;';

  myChart!: Chart<"pie", number[], string>;

  _objModel: SummaryRepInModel = {} as SummaryRepInModel;
  fcfrdt = new FormControl<Date | null>(null);

  yData: any[] = [];

  constructor(
    private repService: ReportService,
    private messageService: MessageService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dvdisp = 'display:none;';
  }

  getSReport() {
    if (!this.fcfrdt.value) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please select a date.'
      });
      return;
    }

    this._objModel.flag = 'contact';
    this._objModel.stDate = this.fcfrdt.value;
    this.selDt = this.fcfrdt.value.toDateString();

    this.repService.getDailyReportSummary(this._objModel).subscribe({
      next: response => {
        this.resList = response;
        this.model = response;
        this.ProcessData();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Server Error'
        });
      }
    });
  }

  ProcessData() {
    if (!this.resList.length) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Data',
        detail: 'No summary data found for selected date.'
      });
      return;
    }

    const first = this.resList[0];
    this.yData = [
      first.TotalLeadDayCount,
      first.TotalCallDayCount,
      first.AttendCallDayCount,
      first.RejectCallDayCount,
      first.PendingCallDayCount
    ];

    this.dvdisp = 'display:block;';
    this.DrawPieChart();
  }

  DrawPieChart() {
    if (this.myChart) {
      this.myChart.destroy();
    }
    this.myChart = new Chart<"pie", number[], string>('pie-chart', {
      type: 'pie',
      data: {
        labels: ['TotalLead', 'TotalCall', 'AttendCall', 'RejectCall', 'PendingCall'],
        datasets: [{
          data: this.yData,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            '#34ae4a',
            '#f98030',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        layout: { padding: 20 },
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}
