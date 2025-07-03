import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Api } from '../api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private EmployeeListUrl = Api.GetEmployeeListUrl;
  private employeeSaveUrl = Api.SaveEmployeeDetailUrl;
  private EmployeeRightsUrl = Api.GetEmployeeRights;
  private GetEmployeeByIdUrl = Api.GetEmployeeByIdUrl;
  private GetBranchListUrl = Api.GetBranchListUrl;
  private ResetPasswordUrl = Api.ResetPasswordUrl;
  private AssigneeListUrl = Api.GetLassigneeListUrl;
  private ActiveempListUrl = Api.GetActiveEmpListUrl;

  private EmployeeSubject = new BehaviorSubject<any>(null);
  EmployeeSubjectObservable = this.EmployeeSubject.asObservable();

  private EmployeeRefreshSubject = new BehaviorSubject<any>(null);
  EmployeeRefershObservable = this.EmployeeRefreshSubject.asObservable();

  constructor(private http: HttpClient, private objApi: Api) {}

  EmployeeListRefresh() {
    this.EmployeeRefreshSubject.next(null);
  }

  SendEmployeeId(Id: any) {
    this.EmployeeSubject.next(Id);
  }

  GetEmployeeList(paginationModel: any) {
    return this.objApi.callPost(this.EmployeeListUrl, paginationModel);
  }

  GetEmployeeRights() {
    return this.objApi.callPost(this.EmployeeRightsUrl);
  }

  SaveEmployeeDetails(employeeModel: any) {
    return this.objApi.callPost(this.employeeSaveUrl, employeeModel);
  }

  GetEmployeeById(employeeId: any) {
    return this.objApi.callPost(this.GetEmployeeByIdUrl, employeeId);
  }

  GetBranchList() {
    return this.objApi.callPost(this.GetBranchListUrl);
  }

  ResetPassword() {
    return this.objApi.callPost(this.ResetPasswordUrl);
  }

  GetAssigneeList() {
    return this.objApi.callPost(this.AssigneeListUrl);
  }

  GetActiveEmpList() {
    return this.objApi.callPost(this.ActiveempListUrl);
  }
}
