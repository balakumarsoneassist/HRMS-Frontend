import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api';
import { Observable, Subject } from 'rxjs';
import { ContactModel } from '../../model/Contact/ContactModel';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient,private objApi:Api) { }
  private contactDetailSaveUrl:string=Api.contactContactDetailSaveUrl;
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
  private subject = new Subject<void>();
  private LeadSubject = new Subject<any>();
  leadSendObservable = this.LeadSubject.asObservable();

  private LeadTracIdsubject=new Subject<any>();
  LeadTrackIdObservable=this.LeadTracIdsubject.asObservable();

  SendLeadId(Id) {
    this.LeadSubject.next(Id);
  }

  SendLeadTrack(TrackId: string)
  {
    this.LeadTracIdsubject.next(TrackId);
  }



  saveContactDetails(contactDetailModel: any){
    return this.objApi.callPost(this.contactDetailSaveUrl,contactDetailModel);
    //return this.http.post<any>(this.contactDetailSaveUrl, contactDetailModel)
  }
  getUnassignContactList(PageDetails){
    return this.objApi.callPost(this.contactUnassigContactListUrl,PageDetails);
  }

  statusOpeningAcco() {
    this.subject.next();
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
  }


  private getEmpUrl = Api.GetEmployeeByIdUrl;
  getEmpName(empModel){
    return this.objApi.callPost(this.getEmpUrl,empModel);

  }

}
