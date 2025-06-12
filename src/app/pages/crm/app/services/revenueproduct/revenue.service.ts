import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenueProductService {

  constructor(private http:HttpClient,private objApi:Api) { }

  private GetRPListtUrl=Api.RevenueProductlistUrl;
  GetRPlist()
  {
    return this.objApi.callPost(this.GetRPListtUrl);
  }

  statusOpeningAcco() {
    this.subject.next(null);
  }

  private subject = new Subject<any>();
  private ProductSubject = new Subject<any>();
  ProductidSendObservable = this.ProductSubject.asObservable();

  SendProductId(Id) {
    this.ProductSubject.next(Id);
  }

  private RPSaveUrl=Api.SaveRevenueProductUrl;
  SaveRevenueProduct(model:any){
    return this.objApi.callPost(this.RPSaveUrl,model);
  }


  private TargetSaveUrl=Api.SaveRevenueTargetUrl;
  SaveRevenueTarget(model:any){
    return this.objApi.callPost(this.TargetSaveUrl,model);
  }


  private GetTargetListtUrl=Api.RevenueTargetlistUrl;
  GetTargetlist(pmodel:any)
  {
    return this.objApi.callPost(this.GetTargetListtUrl,pmodel);
  }


  private TargetSubject = new Subject<any>();
  TargetidSendObservable = this.TargetSubject.asObservable();

  SendTargetId(Id) {
    this.TargetSubject.next(Id);
  }

  private GetTargetAchievementUrl=Api.RevenueAchievementUrl;
  GetTargetAchievement(pmodel:any)
  {
    return this.objApi.callPost(this.GetTargetAchievementUrl,pmodel);
  }


  private subject1 = new Subject<any>();
  private EmSubject1 = new Subject<any>();
  empidSendObservable = this.EmSubject1.asObservable();

    statusOpeningAcco1() {
      this.subject1.next(null);
    }

    SendEmpId(Id) {
      this.EmSubject1.next(Id);
    }

  private GetTargetAchievementByempUrl=Api.RevenueAchievementByempUrl;
  GetTargetAchievementByemp(pmodel:any)
  {
    return this.objApi.callPost(this.GetTargetAchievementByempUrl,pmodel);
  }
}
