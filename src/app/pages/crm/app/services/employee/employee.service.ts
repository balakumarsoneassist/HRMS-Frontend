import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Api } from '../api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private EmployeeListUrl=Api.GetEmployeeListUrl;
private employeeSaveUrl:string=Api.SaveEmployeeDetailUrl;
private EmployeeRightsUrl:string=Api.GetEmployeeRights;
private GetEmployeeByIdUrl:string=Api.GetEmployeeByIdUrl;
private GetBranchListUrl:string=Api.GetBranchListUrl;
private ResetPasswordUrl:string=Api.ResetPasswordUrl;
private AssigneeListUrl=Api.GetLassigneeListUrl;

  constructor(private http:HttpClient,private objApi:Api) { }
  private EmployeeSubject = new Subject<any>();
  EmployeeSubjectObservable = this.EmployeeSubject.asObservable();

  private EmployeeRefreshSubject = new Subject<any>();
  EmployeeRefershObservable = this.EmployeeRefreshSubject.asObservable();
  EmployeeListRefresh() {
    this.EmployeeRefreshSubject.next(null);
  }

  SendEmployeeId(Id)
  {
    this.EmployeeSubject.next(Id);
  }
  GetEmployeeList(PaginationModel){
    return this.objApi.callPost(this.EmployeeListUrl, PaginationModel)
  }
  GetEmployeeRights()
  {
    return this.objApi.callPost(this.EmployeeRightsUrl)
  }
  SaveEmployeeDetails(employeeModel){
    return this.objApi.callPost(this.employeeSaveUrl, employeeModel)
  }

  GetEmployeeById(EmployeeId){
    return this.objApi.callPost(this.GetEmployeeByIdUrl,EmployeeId)
  }
  GetBranchList()
  {
    return this.objApi.callPost(this.GetBranchListUrl)
  }
  ResetPassword()
  {
    return this.objApi.callPost(this.ResetPasswordUrl);
  }
  //--pvr
  GetAssigneeList()
  {
    return this.objApi.callPost(this.AssigneeListUrl)
  }
  private ActiveempListUrl=Api.GetActiveEmpListUrl;
  GetActiveEmpList()
  {
    return this.objApi.callPost(this.ActiveempListUrl)
  }
}
