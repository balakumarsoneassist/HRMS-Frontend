import { Injectable } from '@angular/core';
import { Api } from '../api';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomertrackService {

    constructor(private http:HttpClient,private objApi:Api) { }
    private CustTrackSubject = new Subject<any>();
    CustTrackSubjectObservable = this.CustTrackSubject.asObservable();

    private subject = new Subject<any>();
    private CustSubject = new Subject<any>();
    custSendObservable = this.CustSubject.asObservable();





    CustListRefresh() {
      this.CustTrackSubject.next(null);
    }

    SendCustomerid(Id:any)
    {
      this.CustSubject.next(Id);
    }

    SendCustomerTrack(trackno)
    {
      this.CustTrackSubject.next(trackno);
    }

    private custTrackListUrl:string = Api.getCustomerTrackUrl;
    GetExtCustomerTrack(pmodel:any)
    {
      return this.objApi.callPost(this.custTrackListUrl,pmodel)
    }

    private getCustomerTracHistoryUrl:string=Api.GetCustomerTracHistoryUrl;
    GetCustomerTrackHistoryList(Id)
    {

      return this.objApi.callPost(this.getCustomerTracHistoryUrl,Id);
    }


    private subject1 = new Subject<any>();
    private CustSubject1 = new Subject<any>();
    custidSendObservable = this.CustSubject1.asObservable();

    statusOpeningAcco() {
      this.subject1.next(null);
    }

    SendCustId(Id) {
      this.CustSubject1.next(Id);
    }

    private SaveServCallurl:string = Api.SaveServiceCallUrl;
    SaveServiceCallhistory(m:any) {
      return this.objApi.callPost(this.SaveServCallurl,m)
    }

    private GetServCallurl:string = Api.GetServiceCallUrl;
    GetServiceCallList(m:any){
      return this.objApi.callPost(this.GetServCallurl,m)
    }

    private GetervCallFrequrl:string = Api.GetServiceCallFreqUrl;
    GetServiceCallfreq(m:any) {
      return this.objApi.callPost(this.GetervCallFrequrl,m)
    }
}
