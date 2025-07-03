import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class BranchServiceService {
  private GetBranchNameListUrl = Api.GetBranchNameListUrl;
  private SaveBranchDetailsUrl = Api.SaveBranchDetailsUrl;
  private GetBranchByIdUrl = Api.GetBranchByIdUrl;

  private branchEditSubject = new BehaviorSubject<any>(null);
  BranchObservable = this.branchEditSubject.asObservable();

  private branchRefreshSubject = new BehaviorSubject<any>(null);
  BranchRefreshObservable = this.branchRefreshSubject.asObservable();

  constructor(private objApi: Api) {}

  GetBranchList() {
    return this.objApi.callPost(this.GetBranchNameListUrl);
  }

  SaveBranchDetails(branchDetails: any) {
    return this.objApi.callPost(this.SaveBranchDetailsUrl, branchDetails);
  }

  GetBranchById(branchDetails: any) {
    return this.objApi.callPost(this.GetBranchByIdUrl, branchDetails);
  }

  EditBranch(branchDetail: any) {
    this.branchEditSubject.next(branchDetail);
  }

  BranchListRefresh() {
    this.branchRefreshSubject.next(null);
  }
}
