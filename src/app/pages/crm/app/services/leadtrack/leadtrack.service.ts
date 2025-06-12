import { Injectable } from '@angular/core';
import { Api } from '../api';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { PaginationModel } from '../../model/Contact/ContactModel';

@Injectable({
  providedIn: 'root'
})
export class LeadtrackService {
  LeadOntrackList(_objPageModel: PaginationModel) {
    throw new Error('Method not implemented.');
  }
  private assignEmployeeToContactUrl=Api.AssignEmployeeUrl;
  private assignEmployeeToLeadUrl=Api.assignEmployeeToLeadUrl;
  private contactUntrackUrl:string=Api.contactUnTrackList;
  private ContactOntrackListUrl:string=Api.ContactOntrackListUrl;
  private leadOntrackListUrl:string=Api.leadOntrackListUrl;
  private leadUntrackListUrl:string=Api.leaduntrackListUrl;
  private createNewLeadTrack:string=Api.createNewLeadTrack;
  private OnReviewListUrl:string=Api.ReviewListUrl;

  constructor(private http:HttpClient,private objApi:Api) { }

  private leadTrackSubject = new Subject<any>();
  leadTrackSubjectObservable = this.leadTrackSubject.asObservable();


  LeadListRefresh() {
    this.leadTrackSubject.next(null);
  }

  AssignEmployeeToContact(contactTrack){

    return this.objApi.callPost(this.assignEmployeeToContactUrl, contactTrack)
  }
  AssignEmployeeToLead(contactTrack){
    return this.objApi.callPost(this.assignEmployeeToLeadUrl, contactTrack)
  }
  GetContactUntrack(PaginationDetail)
  {
    return this.objApi.callPost(this.contactUntrackUrl,PaginationDetail);
  }
  GetContactOntrack(PaginationDetail){
    return this.objApi.callPost(this.ContactOntrackListUrl, PaginationDetail)
  }

  GetReviewList(){
    return this.objApi.callPost(this.OnReviewListUrl)
  }
  GetLeadOntrack(PaginationDetail){
    return this.objApi.callPost(this.leadOntrackListUrl,PaginationDetail)
  }
  GetLeadUnTrack(PaginationDetail)
  {
    return this.objApi.callPost(this.leadUntrackListUrl,PaginationDetail)
  }
  CreateNewLeadTrack(Id)
  {
    return this.objApi.callPost(this.createNewLeadTrack,Id)
  }

}
