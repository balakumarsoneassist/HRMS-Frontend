import { Component, OnInit } from '@angular/core';
import { DailyReportModel, DailyReportSummaryModel, SummaryRepInModel } from '../model/report/dailyreport';
//import { DailyReportModel } from '../model/report/dailyreport';
import { PaginationModel1 } from '../model/report/dailyreport';
import { ReportService } from '../services/report/reportservice';
import { LeadService } from '../services/lead/lead.service';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import { Chart,registerables  } from 'chart.js';

import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';

@Component({
    standalone: true,
      imports: [CommonModule,FormsModule,CalendarModule,ReactiveFormsModule],
  selector: 'app-reportsummary',
  templateUrl: './reportsummary.component.html',
  styleUrls: ['./reportsummary.component.css']
})
export class ReportsummaryComponent implements OnInit {
  selDt:any;
  model!:DailyReportSummaryModel[];
  resList!:DailyReportSummaryModel[];

  _objModel:SummaryRepInModel = {} as SummaryRepInModel;

  fcfrdt: any = new FormControl('');
  myChart!:Chart;

  public xData!: any[];
  public yDataMain!: string[];
  public yData!:number[];
  public bgcolor!: string[];
  public yDataTL!:any[];
  public yDataTC!:any[];
  public yDataAC!:any[];
  public yDataRC!:any[];
  public yDataPC!:any[];
  dvdisp!:string;


  dmonyr:any;
  yDataMani!:string;

  constructor(private repService:ReportService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dvdisp = "display:none;"
  }

  getSReport(){
    console.log('pv1');
    this._objModel.flag = 'admin';
    this._objModel.stDate = this.fcfrdt.value;
    this.selDt = this.fcfrdt.value.toString().substring(0,15);

    console.log('ori val  ' + this.fcfrdt.value + "-----" );

    console.log(this._objModel);
    this.repService.getDailyReportSummary(this._objModel).subscribe(
      response => {

          this.resList = response
          this.model=response;
          console.log('pv3---' + this.model);
          this.ProcessData();


      },
      error => alert('Server Error')
    )


  }

  ProcessData() {
    this.xData = [];
    this.yData = [];
    this.yDataMain = [];
    this.bgcolor = [];
    this.yDataTC = [];
    this.yDataTL = [];
    this.yDataRC = [];
    this.yDataAC = [];
    this.yDataPC = [];
    for(var i=0; i<this.resList.length; i++){

       this.xData.push(this.resList[i].Name);
      /* Data in diff way reverse bar chart
       this.yData.splice(0,5);
       this.yData.push(this.resList[i].TotalLeadDayCount);
       this.yData.push(this.resList[i].TotalCallDayCount);
       this.yData.push(this.resList[i].AttendCallDayCount);
       this.yData.push(this.resList[i].RejectCallDayCount);
       this.yData.push(this.resList[i].PendingCallDayCount);
       this.yDataMani = '[' + this.yData + ']'
       console.log(this.xData + "-------" + this.yDataMani);
       this.yDataMain.push(this.yDataMani);*/

       this.yDataTL.push(this.resList[i].TotalLeadDayCount);
       this.yDataTC.push(this.resList[i].TotalCallDayCount);
       this.yDataAC.push(this.resList[i].AttendCallDayCount);
       this.yDataRC.push(this.resList[i].RejectCallDayCount);
       this.yDataPC.push(this.resList[i].PendingCallDayCount);
    }
    console.log('test--' + this.xData);
    console.log('test1--' + this.yDataTC);
    this.dvdisp = "display:block;"
    this.DrawLineChart();
  }

  DrawLineChart(){
    console.log('inside chart');
    if (this.myChart != undefined){
      this.myChart.destroy();
    }
    this.myChart = new Chart('line-chart', {
      //new Chart(myElement, {
          type: 'bar',

          data: {
           // labels: this.xData,
            labels: this.xData,

            datasets: [
              {
                label: "TotalLeadDayCount",
                backgroundColor: "#8e5ea2",

                data: this.yDataTL
            },
            {
                label: "TotalCallDayCount",
                backgroundColor: "#3e95cd",


                data: this.yDataTC
            },
            {
                label: "AttendCallDayCount",
                backgroundColor: "green",

                data: this.yDataAC
            },
            {
              label: "RejectCallDayCount",
              backgroundColor: "red",

              data: this.yDataRC
          },
          {
              label: "PendingCallDayCount",
              backgroundColor: "#c4a350",

              data: this.yDataPC
          }
            /*  {
                data: this.yData,
                label: this.dmonyr,
                backgroundColor: this.bgcolor,
                borderColor: this.bgcolor,
                borderWidth: 1,
                barThickness: 20


                //fill: false
              }*/
            ]
          },
          options: {
            layout: {
              padding: 20
          }
          }
        });





  }

}
