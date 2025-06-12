import { Injectable } from '@angular/core';
import { Api } from '../api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private objAPI:Api) 
  { }
  private SaveStateDetailsUrl=Api.SaveStateDetailsUrl
  private GetStateListUrl=Api.GetStateListUrl
  private GetStateByIdUrl=Api.GetStateByIdUrl
  
  SaveStateDetails(stateDetails){
    return this.objAPI.callPost(this.SaveStateDetailsUrl,stateDetails)
  }
  GetStateList(){
   return this.objAPI.callPost(this.GetStateListUrl)
   }
   GetStateById(Id) {
    return this.objAPI.callPost(this.GetStateByIdUrl, Id)
   }

  private stateSubject = new Subject<any>();
  stateObservable = this.stateSubject.asObservable();

  stateEdit(stateDetail) {
    this.stateSubject.next(stateDetail);
  }
}
