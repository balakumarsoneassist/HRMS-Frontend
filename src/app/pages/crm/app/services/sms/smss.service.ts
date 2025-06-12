import { Injectable } from '@angular/core';
import { Api } from '../api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmssService {
 
  constructor(private http:HttpClient,private objApi:Api) { }

  private bulksms:string = Api.sendBulkSmsUrl;

  sendBulkSms(RepModel:any){
    console.log(RepModel)
    return this.objApi.callPost(this.bulksms,RepModel)
  }

}
