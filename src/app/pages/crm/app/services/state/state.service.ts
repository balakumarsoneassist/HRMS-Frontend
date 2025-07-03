import { Injectable } from '@angular/core';
import { Api } from '../api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private SaveStateDetailsUrl = Api.SaveStateDetailsUrl;
  private GetStateListUrl = Api.GetStateListUrl;
  private GetStateByIdUrl = Api.GetStateByIdUrl;

  private stateSubject = new BehaviorSubject<any>(null);
  stateObservable = this.stateSubject.asObservable();

  private stateRefreshSubject = new BehaviorSubject<any>(null);
  stateRefreshObservable = this.stateRefreshSubject.asObservable();

  constructor(private objAPI: Api) {}

  SaveStateDetails(stateDetails: any) {
    return this.objAPI.callPost(this.SaveStateDetailsUrl, stateDetails);
  }

  GetStateList() {
    return this.objAPI.callPost(this.GetStateListUrl);
  }

  GetStateById(Id: any) {
    return this.objAPI.callPost(this.GetStateByIdUrl, Id);
  }

  stateEdit(stateDetail: any) {
    this.stateSubject.next(stateDetail);
  }

  stateListRefresh() {
    this.stateRefreshSubject.next(null);
  }
}
