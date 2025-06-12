import { Injectable } from '@angular/core';
import { Api } from '../api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BajajService {

  constructor(private objApi:Api) { }
  public AssignLeadToBajajUrl=Api.AssignLeadtoBajajUrl;
  public GetBajajLeadUrl=Api.GetBajajLeadUrl;
  public GetBajajAssignedlistUrl = Api.GetBajajAssinedLeadListUrl;

  private BajajSubject = new Subject<any>();
  BajajSubjectObservable = this.BajajSubject.asObservable();

  SendBajajId(Id) {
    this.BajajSubject.next(Id);
  }
  AssignLeadToBajaj(BajajDetails)
  {
    return this.objApi.callPost(this.AssignLeadToBajajUrl,BajajDetails);
  }

  GetBajajLead(Id)
  {
    //need modification
    return this.objApi.callPost(this.GetBajajLeadUrl,Id);
  }

  GetBajajAssignedList(){
    return this.objApi.callPost(this.GetBajajAssignedlistUrl);
  }
}
