
import { Component, OnInit } from '@angular/core';
import { DailyReportModel, DailyReportSummaryModel, SummaryRepInModel } from '../model/report/dailyreport';
//import { DailyReportModel } from '../model/report/dailyreport';
import { PaginationModel1 } from '../model/report/dailyreport';
import { ReportService } from '../services/report/reportservice';
import { LeadService } from '../services/lead/lead.service';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import { Chart, registerables } from 'chart.js';

import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DatePickerModule],
    selector: 'app-reportsummarycontact',
    templateUrl: './reportsummarycontact.component.html',
    styleUrls: ['./reportsummarycontact.component.css']
})
export class ReportsummarycontactComponent implements OnInit {
    selDt: any;
    model!: DailyReportSummaryModel[];
    resList!: DailyReportSummaryModel[];

    _objModel: SummaryRepInModel = {} as SummaryRepInModel;

    fcfrdt: any = new FormControl('');
    myChart!: Chart | any;
    sss!: string;

    public xData!: any[];
    public yDataMain!: string[];
    public yData!: any[];
    public bgcolor!: string[];
    public yDataTL!: any[];
    public yDataTC!: any[];
    public yDataAC!: any[];
    public yDataRC!: any[];
    public yDataPC!: any[];
    dvdisp!: string;


    dmonyr: any;
    yDataMani!: string;

    constructor(private repService: ReportService) {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.dvdisp = "display:none;"
    }

    getSReport() {
        console.log('pv1');
        this._objModel.flag = 'contact';
        this._objModel.stDate = this.fcfrdt.value;
        this.selDt = this.fcfrdt.value.toString().substring(0, 15);

        console.log('ori val  ' + this.fcfrdt.value + "-----");

        console.log(this._objModel);
        this.repService.getDailyReportSummary(this._objModel).subscribe(
            response => {

                this.resList = response
                this.model = response;
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

        for (var i = 0; i < this.resList.length; i++) {

            this.xData.push(this.resList[i].Name);
            /* Data in diff way reverse bar chart*/
            this.yData.splice(0, 5);
            this.yData.push(this.resList[i].TotalLeadDayCount);
            this.yData.push(this.resList[i].TotalCallDayCount);
            this.yData.push(this.resList[i].AttendCallDayCount);
            this.yData.push(this.resList[i].RejectCallDayCount);
            this.yData.push(this.resList[i].PendingCallDayCount);




        }
        console.log(this.xData + "-------" + this.yData);

        this.dvdisp = "display:block;"
        this.DrawLineChart();
    }

    DrawLineChart() {
        console.log('inside chart');
        if (this.myChart != undefined) {
            this.myChart.destroy();
        }
        this.myChart = new Chart('pie-chart', {
            //new Chart(myElement, {
            type: 'pie',

            data: {
                // labels: this.xData,
                labels: ['TotalLead', 'TotalCall', 'AttendCall', 'RejectCall', 'PendingCall'],

                datasets: [{
                    data: this.yData,
                    label: this.dmonyr,
                    backgroundColor: [

                        'rgb(255, 99, 132)',
                        'rgb(255, 205, 86)',
                        '#34ae4a',
                        '#f98030',
                        'rgb(54, 162, 235)',


                    ],

                    borderColor: this.bgcolor,
                    hoverOffset: 4
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
