import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class BranchServiceService {
private GetBranchNameListUrl=Api.GetBranchNameListUrl;
public  SaveBranchDetailsUrl=Api.SaveBranchDetailsUrl;
public GetBranchByIdUrl=Api.GetBranchByIdUrl;
  constructor(private objApi:Api) { }
  GetBranchList(){
      return this.objApi.callPost(this.GetBranchNameListUrl)
  }
  SaveBranchDetails(branchDetails){
    return this.objApi.callPost(this.SaveBranchDetailsUrl,branchDetails);
  }
  GetBranchById(branchDetails){
    return this.objApi.callPost(this.GetBranchByIdUrl,branchDetails)
}
private BranchEdit =new Subject<any>();
BranchObservable = this.BranchEdit.asObservable();

EditBranch(Id){
this.BranchEdit.next(Id);
}
}
