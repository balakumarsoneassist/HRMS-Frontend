import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  public SaveBankNameUrl=Api.SaveBankNameUrl;
  public GetBankListUrl = Api.GetBankNameList;
  public GetBankByIdUrl = Api.GetBankByIdUrl;
  constructor(private _objApi:Api) { }      
  SaveBankDetails(BankDetail)
  {
    return this._objApi.callPost(this.SaveBankNameUrl,BankDetail);
  }
  GetBankList()
  {
    return this._objApi.callPost(this.GetBankListUrl)
  }
  GetBankById(BankId) {
    return this._objApi.callPost(this.GetBankByIdUrl, BankId)
  }
  private bankSubject = new Subject<any>();
  bankObservable = this.bankSubject.asObservable();

  bankEdit(BankDetail) {
    this.bankSubject.next(BankDetail);
  }

}
