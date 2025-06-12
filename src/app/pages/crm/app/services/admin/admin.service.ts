import { Injectable } from '@angular/core';

import { Api } from '../api';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })


export class adminService {
  public adminReportUrl=Api.GetAdminReporttUrl;
  
  constructor(private objApi:Api) { }


    getAdminReportList()
    {
      return this.objApi.callPost(this.adminReportUrl);
    }
  
}
