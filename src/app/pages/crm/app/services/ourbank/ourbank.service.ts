import { Injectable } from '@angular/core';
import { Api } from '../api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OurbankService {

  constructor(private objApi:Api) { }
  //private SaveLocationDetailsUrl:string=Api.SaveLocationDetailsUrl;
  private GetOurbankDiffListUrl=Api.GetOurBankDiffListUrl;
  private GetOurbankDetailsListUrl = Api.GetOurBankDetailsListUrl;
/*  private GetLocationByIdUrl=Api.GetLocationByIdUrl;
  SaveLocationDetails(LocationDetails){
      return this.objApi.callPost(this.SaveLocationDetailsUrl,LocationDetails)
  }

GetLocationById(locationDetails){
  return this.objApi.callPost(this.GetLocationByIdUrl,locationDetails)
}

private locationSubject = new Subject<any>();
  locationObservable = this.locationSubject.asObservable();

  locationEdit(locationDetail) {
    this.locationSubject.next(locationDetail);
  }*/

  GetOurBankDiffList(){
    return this.objApi.callPost(this.GetOurbankDiffListUrl)
}

GetOurBankList(){
  return this.objApi.callPost(this.GetOurbankDetailsListUrl)
}

private SaveOBDetailsUrl = Api.SaveOurBankDetailsUrl;
SaveOurBankDetails(model){
  return this.objApi.callPost(this.SaveOBDetailsUrl,model)
}

private OurBankSubject = new Subject<any>();
  OurBankSubjectObservable = this.OurBankSubject.asObservable();

  SendOurBankId(Id) {
    this.OurBankSubject.next(Id);
  }

  private GetOBbyidUrl = Api.GetOurBankbyidUrl;
  GetOurBankById(model){
    return this.objApi.callPost(this.GetOBbyidUrl,model)
  }
}