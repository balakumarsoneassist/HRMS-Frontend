import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Api } from '../api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    constructor(private http:HttpClient,private objApi:Api) { }

private custListUrl:string = Api.getCustomerListUrl;
    getCustomerList(){
        return this.objApi.callPost(this.custListUrl)
      }
private AsscustListUrl:string = Api.getAssCustomerListUrl;
      getAssignedCustomerList(){
        return this.objApi.callPost(this.AsscustListUrl)
      }



}