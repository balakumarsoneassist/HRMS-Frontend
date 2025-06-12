import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api';


import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReassignService {

  constructor(private http:HttpClient,private objApi:Api) { }






  private subject = new Subject<any>();
  private StatusSubject = new Subject<any>();
  StatusSendObservable = this.StatusSubject.asObservable();



  private RejectListUrl:string = Api.getRejectListUrl;
  getrejectListReport(rmodel:any){

    return this.objApi.callPost(this.RejectListUrl,rmodel)
  }

  private OtherListUrl:string = Api.getOtherReassignListUrl;
  getotherListReport(rmodel:any){

    return this.objApi.callPost(this.OtherListUrl,rmodel)
  }

  SendStatusCode(code) {
    this.StatusSubject.next(code);
  }

  statusOpeningAcco() {
    this.subject.next(null);
  }

  private ReassignUrl:string = Api.rejectReassignUrl;
  reassignRecords(imodel:any) {
    return this.objApi.callPost(this.ReassignUrl, imodel)
  }

  private ReassignOtherUrl:string = Api.rejectOtherReassignUrl;
  reassignOtherRecords(imodel:any) {
    return this.objApi.callPost(this.ReassignOtherUrl, imodel)
  }

  private RejectByListUrl:string = Api.getRejectByListUrl;
  getrejectbyempList(){

    return this.objApi.callPost(this.RejectByListUrl)
  }

  private CownByListUrl:string = Api.getCownByListUrl;
  getcownbyempList(){

    return this.objApi.callPost(this.CownByListUrl)
  }
}
