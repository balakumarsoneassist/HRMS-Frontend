import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ContactModel } from '../../model/Contact/ContactModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient, private objApi: Api) {}

  // API URLs
  private contactDetailSaveUrl: string = Api.contactContactDetailSaveUrl;
  private contactUnassigContactListUrl: string = Api.getunassignContactListUrl;
  private leadTrackUrl = Api.SaveLeadTrackUrl;
  private contactListUrl = Api.contactListUrl;
  private getLeadTrackUrl: string = Api.GetLeadTrackUrl;
  private getLeadTracHistoryUrl: string = Api.GetLeadTracHistoryUrl;
  private contactcardUrl: string = Api.contactcardUrl;
  private connectorContactListUrl = Api.connectorContactListUrl;
  private connectorContactUpdateUrl = Api.connectorContactUpdateUrl;
  private GetContactListtUrl = Api.dailyCrmReport;
  private GetStatusListtUrl = Api.contactStatusListUrl;
  private getEmpUrl = Api.GetEmployeeByIdUrl;

  // Status Acco trigger
  private subject = new Subject<void>();
  statusOpeningAcco(): void {
    this.subject.next();
  }
  getStatusAcco(): Observable<any> {
    return this.subject.asObservable();
  }

  // ✅ Use BehaviorSubjects for lead state
  private LeadSubject = new BehaviorSubject<any>(null);
  private LeadTracIdsubject = new BehaviorSubject<any>(null);

  leadSendObservable = this.LeadSubject.asObservable();
  LeadTrackIdObservable = this.LeadTracIdsubject.asObservable();

  SendLeadId(id: number): void {
    this.LeadSubject.next(id);
  }

  SendLeadTrack(trackId: string): void {
    this.LeadTracIdsubject.next(trackId);
  }

  // Data APIs
  saveContactDetails(contactDetailModel: any) {
    return this.objApi.callPost(this.contactDetailSaveUrl, contactDetailModel);
  }

  getUnassignContactList(PageDetails) {
    return this.objApi.callPost(this.contactUnassigContactListUrl, PageDetails);
  }

  SaveLeadTrack(leadTrackModel) {
    return this.objApi.callPost(this.leadTrackUrl, leadTrackModel);
  }

  GetLeadTrack(id) {
    return this.objApi.callPost(this.getLeadTrackUrl, id);
  }

  GetLeadTrackHistoryList(id) {
    return this.objApi.callPost(this.getLeadTracHistoryUrl, id);
  }

  GetContactList(PageDetails) {
    return this.objApi.callPost(this.contactListUrl, PageDetails);
  }

  Getcardcontact() {
    return this.objApi.callPost(this.contactcardUrl);
  }

  GetConnectorContactList(PageDetails) {
    return this.objApi.callPost(this.connectorContactListUrl, PageDetails);
  }

  updateConnectorContact(connectContact) {
    return this.objApi.callPost(this.connectorContactUpdateUrl, connectContact);
  }

  GetDailyReport(PaginationDetail) {
    return this.objApi.callPost(this.GetContactListtUrl, PaginationDetail);
  }

  GetStatusList() {
    return this.objApi.callPost(this.GetStatusListtUrl);
  }

  getEmpName(empModel) {
    return this.objApi.callPost(this.getEmpUrl, empModel);
  }
}
