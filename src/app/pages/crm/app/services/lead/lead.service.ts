import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http:HttpClient,private objApi:Api) { }
  private leadPersonalDetailsSaveUrl:string=Api.leadPersonalDetailSaveUrl;
  private UnassigLeadListUrl:string=Api.getunassignLeadListUrl;
  private GetLeadPersonalDetailUrl:string=Api.GetLeadPersonalDetailUrl;
  private GetLeadOccupationalDetailUrl:string=Api.GetLeadOccupationalDetailUrl;
  private GetLeadListUrl:string=Api.GetLeadListUrl;

  saveLeadPersonalDetails(leadPersonaldetailModel){
    return this.objApi.callPost(this.leadPersonalDetailsSaveUrl, leadPersonaldetailModel )
  }
  getUnassignLeadList(PageDetails){
    return this.objApi.callPost(this.UnassigLeadListUrl,PageDetails)
  }

  GetLeadPersonalDetails(Id)
  {
    return this.objApi.callPost(this.GetLeadPersonalDetailUrl,Id)
  }
  GetLeadOccupationDetails(Id)
  {
    return this.objApi.callPost(this.GetLeadOccupationalDetailUrl,Id)
  }
  GetLeadList(PaginationDetail){
    return this.objApi.callPost(this.GetLeadListUrl,PaginationDetail)
  }


}
