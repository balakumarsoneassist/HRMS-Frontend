import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CibilService {
  private testNameSubject = new Subject<any>();
  testNameObservable = this.testNameSubject.asObservable();

  PassCibilReport(cibilReport) {
    this.testNameSubject.next(cibilReport);
  }

  public GetOtpUrl:string=Api.GetOTPRequestUrl;
  public GernerateCibilReportUrl:string=Api.GernerateCibilReportUrl;
  public CibilCheckerListUrl:string=Api.CibilCheckerListUrl;
  public SingleCibilreportUrl:string=Api.SingleCibilreportUrl;
  constructor(private http:HttpClient,private objApi:Api) { }
  GetOtp(OTPRequestDetails){
    return this.objApi.callPost(this.GetOtpUrl,OTPRequestDetails);
  }
  GenerateCibilReport(CilbilRequstDetails){
    return this.objApi.callPost(this.GernerateCibilReportUrl,CilbilRequstDetails);
  }
  GetCibilCheckerList()
  {
      return this.objApi.callPost(this.CibilCheckerListUrl);
  }

  GetSingilCibilReport(Id)
  {
    return this.objApi.callPost(this.SingleCibilreportUrl,Id)
  }
}
