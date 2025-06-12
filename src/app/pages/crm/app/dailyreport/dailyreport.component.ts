import { Component, OnInit } from '@angular/core';
import { DailyReportModel } from '../model/report/dailyreport';
import { PaginationModel1 } from '../model/report/dailyreport';
import { ReportService } from '../services/report/reportservice';
import { FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';

@Component({
    standalone: true,
      imports:[CommonModule,FormsModule,ReactiveFormsModule,CalendarModule],
  selector: 'app-dailyreport',
  templateUrl: './dailyreport.component.html',
  styleUrls: ['./dailyreport.component.css']
})

export class DailyreporComponent implements OnInit {
  ManualPageInput:any;
  PageNumber:number=0;
  TotalNumberOfPages=1;
  TotalRecordNo:Number=0;
  IsbtnPreviousEnable:boolean = true;
  IsbtnNextEnable:boolean = true;
  StartNo!:number;
  EndNo!:number;
  _objPageModel:PaginationModel1 = {} as PaginationModel1;

  //repService: ReportService;
  unassignedList:any
  SearchText:any;
  model!:DailyReportModel[];

  fcContactfby : any = new FormControl('');
  fcfrdt : any = new FormControl('');
  fctodt : any = new FormControl('');
  EmpList:any;


  constructor(private repService:ReportService,private _objEmpService:EmployeeService) { }

  ngOnInit(): void {

    this.GetEmpNameList();
  }
  getDReport(){
    this.getDailyUserReportList_pv();
  }

  getDailyUserReportList_pv(){
    console.log('pv1');
    this._objPageModel.PageNumber=this.PageNumber;
    this._objPageModel.SearchText = this.SearchText;
    /*this.repService.getUnassignLeadList(this._objPageModel).subscribe(
      response => {
        console.log('test');
        return;
      },error => alert('Server Error')
    )
  }*/
    console.log('ori val  ' + this.fcfrdt.value + "-----" + this.fctodt.value);
    this._objPageModel.FromDate = this.fcfrdt.value;
    this._objPageModel.ToDate = this.fctodt.value;
    this._objPageModel.AssigneeName = this.fcContactfby.value;
    console.log(this._objPageModel);
    this.repService.getDailyUserReport(this._objPageModel).subscribe(
      response => {
          this.unassignedList=response
          this.model=this.unassignedList;
          console.log('pv3');
          if(this.unassignedList.length==0){
            this.PageNumber=0;
            this.TotalRecordNo=0;
            this.TotalNumberOfPages=0;
            this.StartNo=0;
            this.EndNo=0;
            return;
          }
          this.TotalRecordNo=this.unassignedList[0].TotalRows;
          this.ManualPageInput=this.PageNumber+1;
          this.PageFooterCalculation();
          this.EnablePageButton();
      },
      error => alert('Server Error')
    )
  }

  //fill combobox
  GetEmpNameList(){
    this._objEmpService.GetAssigneeList().subscribe(
      response => {
          this.EmpList=response;
          console.log(this.EmpList);
      },
      error => alert('InternalServer Error')
    )
  }

  //Common for all reports
  GoToNextPage()
{
  if(this.PageNumber<this.TotalNumberOfPages)
  {
    this.PageNumber=this.PageNumber+1;
  }
this.getDailyUserReportList_pv();
this.EnablePageButton();
}
GoToPreviousPage()
{
  if(this.PageNumber>0){
    this.PageNumber=this.PageNumber-1;
  }
  else
  {
    this.IsbtnPreviousEnable=false;
  }
  this.getDailyUserReportList_pv();
  this.EnablePageButton();
}
EnablePageButton()
{

  if(this.PageNumber>0){
    this.IsbtnPreviousEnable=true;
  }
  else{
    this.IsbtnPreviousEnable=false;
  }
  if(this.PageNumber+1<this.TotalNumberOfPages||this.PageNumber==0){

    this.IsbtnNextEnable=true;
  }
  else{
    this.IsbtnNextEnable=false;
  }
}
PageFooterCalculation()
{
  this.StartNo=(this.PageNumber*10)+1;
  this.EndNo=(this.PageNumber*10)+10;
  let models : any = this.model[0]
  this.TotalNumberOfPages=Math.floor(models.TotalRows/10);
  if((models.TotalRows%10)>0)
  {
    this.TotalNumberOfPages=this.TotalNumberOfPages+1;
  }
}
}
