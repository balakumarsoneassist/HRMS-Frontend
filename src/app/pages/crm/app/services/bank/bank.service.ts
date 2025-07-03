import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  public SaveBankNameUrl = Api.SaveBankNameUrl;
  public GetBankListUrl = Api.GetBankNameList;
  public GetBankByIdUrl = Api.GetBankByIdUrl;

  private bankSubject = new BehaviorSubject<any>(null);
  bankObservable = this.bankSubject.asObservable();

  constructor(private _objApi: Api) {}

  SaveBankDetails(BankDetail: any) {
    return this._objApi.callPost(this.SaveBankNameUrl, BankDetail);
  }

  GetBankList() {
    return this._objApi.callPost(this.GetBankListUrl);
  }

  GetBankById(BankId: any) {
    return this._objApi.callPost(this.GetBankByIdUrl, BankId);
  }

  bankEdit(BankDetail: any) {
    this.bankSubject.next(BankDetail);
  }

  private bankRefreshSubject = new BehaviorSubject<any>(null);
bankRefreshObservable = this.bankRefreshSubject.asObservable();

bankListRefresh() {
  this.bankRefreshSubject.next(null);
}

}
