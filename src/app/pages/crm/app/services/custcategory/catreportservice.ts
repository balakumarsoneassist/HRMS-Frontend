import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class CatReportService {

  constructor(private http:HttpClient,private objApi:Api) { }

  private catReportUrl:string=Api.getCustCatReportUrl;
  private catDetailReportUrl:string=Api.getSegmentwiseCustUrl;

//   private overAllUrl:string = Api.getOverAllStatusReportUrl;
//   private lfAllUrl:string = Api.getLFallStatusReportUrl;
//   private  cfAllUrl:string = Api.getCFallStatusReportUrl;
//   private empfollowUrl:string = Api.getLFCFempStatusUrl;


  private subject = new Subject<any>();
  private CategorySubject = new Subject<any>();
  CatSendObservable = this.CategorySubject.asObservable();




  getCategoryReport(){
    return this.objApi.callPost(this.catReportUrl)
  }

  getSegmentwiseDetailReport(rmodel:any){
    return this.objApi.callPost(this.catDetailReportUrl,rmodel)
  }

//   getCFAllStatusReport(rmodel:any){
//     return this.objApi.callPost(this.cfAllUrl,rmodel)
//   }




  statusOpeningAcco() {
    this.subject.next(null);
  }
  SendStatusCode(code:string) {
    this.CategorySubject.next(code);
  }


  private uniReportUrl:string=Api.getExistCustReportUrl;
  private loanwiseReportUrl:string=Api.getLoanwiseCustUrl;


  getUniCReport(){
    return this.objApi.callPost(this.uniReportUrl)
  }

  getLoanwiseDetailReport(rmodel:any){
    return this.objApi.callPost(this.loanwiseReportUrl,rmodel)
  }


  private ProductSubject = new Subject<any>();
  prodSendObservable = this.ProductSubject.asObservable();

  SendProductCode(code:string) {
    this.ProductSubject.next(code);
  }

  private MLReportUrl:string=Api.getMultiloanReportUrl;
  private MLDetReportUrl:string=Api.getMultiloandetUrl;


  getMultiloanReport(){
    return this.objApi.callPost(this.MLReportUrl)
  }

  getMLDetailReport(rmodel:any){
    //alert(this.MLDetReportUrl);
    return this.objApi.callPost(this.MLDetReportUrl,rmodel)
  }


  private McustSubject = new Subject<any>();
  MLCSendObservable = this.McustSubject.asObservable();

  SendMLCCode(code:string) {
    this.McustSubject.next(code);
  }

}
