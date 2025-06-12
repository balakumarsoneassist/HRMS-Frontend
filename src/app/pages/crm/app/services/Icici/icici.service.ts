import { Injectable } from '@angular/core';
import { Api } from '../api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IciciService {

  constructor(private objApi:Api) { }
  public AssignLeadToIciciUrl=Api.AssignLeadToICICI;
  public GetIciciLeadUrl=Api.GetIciciLeadUrl;
  private IciciSubject = new Subject<any>();
  IciciSubjectObservable = this.IciciSubject.asObservable();

  SendIciciId(Id) {
    this.IciciSubject.next(Id);
  }
  AssignLeadToIcici(IciciDetails)
  {
    return this.objApi.callPost(this.AssignLeadToIciciUrl,IciciDetails);
  }

  GetIciciLead(Id)
  {
    return this.objApi.callPost(this.GetIciciLeadUrl,Id);
  }
}
