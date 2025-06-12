import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesVisitService {

  constructor(private http:HttpClient,private objApi:Api) { }


  /*private contactDetailSaveUrl:string=Api.contactContactDetailSaveUrl;
  private contactUnassigContactListUrl:string=Api.getunassignContactListUrl;
  private leadTrackUrl=Api.SaveLeadTrackUrl;
  private contactListUrl=Api.contactListUrl;
  private getLeadTrackUrl:string=Api.GetLeadTrackUrl;
  private getLeadTracHistoryUrl:string=Api.GetLeadTracHistoryUrl;
  private contactcardUrl:string=Api.contactcardUrl;
  private connectorContactListUrl=Api.connectorContactListUrl;
  private connectorContactUpdateUrl=Api.connectorContactUpdateUrl;
  private GetContactListtUrl=Api.dailyCrmReport;
  private GetStatusListtUrl=Api.contactStatusListUrl;
  private subject = new Subject<any>();
  private LeadSubject = new Subject<any>();
  leadSendObservable = this.LeadSubject.asObservable();

  private getExtCustomerUrl = Api.getExtCustomerUrl;

  private ExtCustomersubject=new Subject<any>();
  ExtCutomerIdObservable=this.ExtCustomersubject.asObservable();

  SendExtCustomer(Id:number)
  {
    console.log(Id + '......trd')
    this.ExtCustomersubject.next(Id);
  }

  GetExtCustomer(paramodel:any)
  {
  //console.log(paramodel + '......QWE4')
    return this.objApi.callPost(this.getExtCustomerUrl,paramodel);
  }

  private UpdateExtCustomerUrl = Api.UpdExtCustomerUrl;
  UpdateExtCustomer(paramodel:any)
  {
  //console.log(paramodel + '......QWE4')
    return this.objApi.callPost(this.UpdateExtCustomerUrl,paramodel);
  }

  private AssignExtCustomerUrl = Api.AssigncustomerUrl;
  AssignCustomerToEmp(paraModel:any){
    return this.objApi.callPost(this.AssignExtCustomerUrl,paraModel);
  }*/

  /*
  saveContactDetails(contactDetailModel){
    return this.objApi.callPost(this.contactDetailSaveUrl,contactDetailModel);
    //return this.http.post<any>(this.contactDetailSaveUrl, contactDetailModel)
  }
  getUnassignContactList(PageDetails){
    return this.objApi.callPost(this.contactUnassigContactListUrl,PageDetails);
  }

  statusOpeningAcco() {
    this.subject.next(null);
  }

  getStatusAcco(): Observable<any> {
    return this.subject.asObservable();
  }

  SaveLeadTrack(leadTrackUrl){
    return this.objApi.callPost(this.leadTrackUrl,leadTrackUrl);
  }

  GetLeadTrack(Id)
  {
    return this.objApi.callPost(this.getLeadTrackUrl,Id);
  }
  GetLeadTrackHistoryList(Id)
  {

    return this.objApi.callPost(this.getLeadTracHistoryUrl,Id);
  }
  GetContactList(PageDetails)
  {
    return this.objApi.callPost(this.contactListUrl,PageDetails);
  }
  Getcardcontact()
  {
    return this.objApi.callPost(this.contactcardUrl);
  }
  GetConnectorContactList(PageDetails)
  {
    return this.objApi.callPost(this.connectorContactListUrl,PageDetails);
  }
  updateConnectorContact(ConnectContact)
  {
    return this.objApi.callPost(this.connectorContactUpdateUrl,ConnectContact);
  }
  GetDailyReport(PaginationDetail){
    return this.objApi.callPost(this.GetContactListtUrl ,PaginationDetail)
  }

  //--pvr
  GetStatusList()
  {
    return this.objApi.callPost(this.GetStatusListtUrl)
  }*/
  private SVisitSaveUrl=Api.SaveSalesVisitUrl;
  SaveSlesVisita(model:any){
    return this.objApi.callPost(this.SVisitSaveUrl,model);
  }

  private SVisitHistorySaveUrl=Api.SaveSalesVisitHistoryUrl;
  SaveSalesVisithistory(model:any){
    return this.objApi.callPost(this.SVisitHistorySaveUrl,model);
  }

  private GetSVtrackUrl = Api.GetSVtrackUrl;
  GetSVtrackList(pmodel:any){
    return this.objApi.callPost(this.GetSVtrackUrl,pmodel);
  }

  private GetSVCListtUrl=Api.SVCustomerlistUrl;
  GetSVcustomerlist()
  {
    return this.objApi.callPost(this.GetSVCListtUrl);
  }

  private subject = new Subject<any>();
  private CustSubject = new Subject<any>();
  custidSendObservable = this.CustSubject.asObservable();

  statusOpeningAcco() {
    this.subject.next(null);
  }

  SendCustId(Id) {
    this.CustSubject.next(Id);
  }

  private GetSVCmycusttUrl=Api.SVCmycustlistUrl;
  GetSVmycustlist(pmodel:any)
  {
    return this.objApi.callPost(this.GetSVCmycusttUrl,pmodel);
  }

  private GetSVCoverallListtUrl=Api.SVCoverallUrl;
  GetSVoveralllist()
  {
    return this.objApi.callPost(this.GetSVCoverallListtUrl);
  }
}
