import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Api } from '../api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
//private EmployeeListUrl=Api.GetEmployeeListUrl;
//private employeeSaveUrl:string=Api.SaveEmployeeDetailUrl;
private QrCodeEmployeeListUrl = Api.QrEmployeeListUrl;
private qrPlaceSaveUrl = Api.SaveQrDetailUrl;
private QrShopListUrl=Api.GetQrShopsListUrl;
private GetShopByIdUrl = Api.GetQrshopsByIdUrl;
private qrTokenSaveUrl = Api.SaveQrTokenUrl;
private QrTokenListUrl=Api.GetQrTokenListUrl;
private QrTokenListAllUrl=Api.GetQrTokenListAllUrl;

  constructor(private http:HttpClient,private objApi:Api) { }

  private ShopSubject = new Subject<any>();
  ShopSubjectObservable = this.ShopSubject.asObservable();

  private ShopsRefreshSubject = new Subject<any>();
  ShopsRefershObservable = this.ShopsRefreshSubject.asObservable();
  ShopsListRefresh() {
    this.ShopsRefreshSubject.next(null);
  }

  GetShopsList(PaginationModel){
    return this.objApi.callPost(this.QrShopListUrl,PaginationModel)
  }
  GetEmployeeNameList()
  {
    return this.objApi.callPost(this.QrCodeEmployeeListUrl)
  }

  SendShopId(Id)
  {
    this.ShopSubject.next(Id);
  }

  SaveQrplaceDetails(placeModel){
    return this.objApi.callPost(this.qrPlaceSaveUrl, placeModel)
  }

  GetShopById(ShopId){
    return this.objApi.callPost(this.GetShopByIdUrl,ShopId)
  }

  SaveQrTokenDetails(tokenModel){
    return this.objApi.callPost(this.qrTokenSaveUrl, tokenModel)
  }

  GetTokenList(PaginationModel){
    return this.objApi.callPost(this.QrTokenListUrl,PaginationModel)
  }

  GetTokenListAll(){
    return this.objApi.callPost(this.QrTokenListAllUrl)
  }

  private AllQrShopListUrl=Api.GetAllQrShopsListUrl;
  GetAllShopsList(){
    return this.objApi.callPost(this.AllQrShopListUrl)
  }

}
