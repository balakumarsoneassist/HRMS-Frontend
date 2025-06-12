import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api';


import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient,private objApi:Api) { }

  private gdailyReportUrl:string=Api.getDailyReportUrl;

  private overAllUrl:string = Api.getOverAllStatusReportUrl;
  private lfAllUrl:string = Api.getLFallStatusReportUrl;
  private  cfAllUrl:string = Api.getCFallStatusReportUrl;
  private empfollowUrl:string = Api.getLFCFempStatusUrl;


  private subject = new Subject<any>();
  private StatusSubject = new Subject<any>();
  StatusSendObservable = this.StatusSubject.asObservable();


  getDailyUserReport(PageDetails:any){
    return this.objApi.callPost(this.gdailyReportUrl,PageDetails)
  }

  private gdailyReporSumtUrl:string=Api.getDailyRepSummaryUrl;
  getDailyReportSummary(RepModel:any){
    return this.objApi.callPost(this.gdailyReporSumtUrl,RepModel)
  }

  private UnassigLeadListUrl:string=Api.getunassignLeadListUrl;
  getUnassignLeadList(PageDetails){
    return this.objApi.callPost(this.UnassigLeadListUrl,PageDetails)
  }


  getOverAllStatusReport(){
    return this.objApi.callPost(this.overAllUrl)
  }

  getLFAllStatusReport(rmodel:any){
    return this.objApi.callPost(this.lfAllUrl,rmodel)
  }

  getCFAllStatusReport(rmodel:any){
    return this.objApi.callPost(this.cfAllUrl,rmodel)
  }

  getempfollowStatusReport(rmodel:any){

    return this.objApi.callPost(this.empfollowUrl,rmodel)
  }


  SendStatusCode(code) {
    this.StatusSubject.next(code);
  }

  statusOpeningAcco() {
    this.subject.next(null);
  }

}
