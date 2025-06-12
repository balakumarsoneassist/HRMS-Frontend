import { Injectable } from '@angular/core';

import { Api } from '../api';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })


export class connecterService {
  public connectorDeatilsUrl=Api.ConnectorDeatilsUrl;
  public connectorListUrl=Api.GetConnectorListUrl;
  public paymentListUrl=Api.paymentListUrl;
  public updatePaymentUrl=Api.updatePaymentUrl;

  private saveConnTrackUrl=Api.SaveConnectorTrackUrl;
  //leadTrackUrl ---- getLeadTrackUrl----getLeadTracHistoryUrl
  private getConnectorTrackUrl:string=Api.GetConnectorTrackUrl;
  private getConnectorTracHistoryUrl:string=Api.GetConnectorTracHistoryUrl;
  private subject = new Subject<any>();
  private ConnectorSubject = new Subject<any>();
  ConnectorSendObservable = this.ConnectorSubject.asObservable();

  private ConnectorTracIdsubject=new Subject<any>();
  ConnectorTrackIdObservable=this.ConnectorTracIdsubject.asObservable();
 // private leadTrackSubject = new Subject<any>();
  //leadTrackSubjectObservable = this.leadTrackSubject.asObservable();

  constructor(private objApi:Api) { }


    saveConnectorDetail(ConnectorDetail)
    {
      return this.objApi.callPost(this.connectorDeatilsUrl,ConnectorDetail);
    }
    getConnectorList()
    {
      return this.objApi.callPost(this.connectorListUrl);
    }
    getPaymentList(PaginationDetails)
    {
      return this.objApi.callPost(this.paymentListUrl,PaginationDetails);
    }
    updateConnectorPayment(Id)
    {
      return this.objApi.callPost(this.updatePaymentUrl+Id);
    }
    //PVR CHANGES
    SendConnectorId(Id) {
      //console.log(Id)
      this.ConnectorSubject.next(Id);
    }

    SendConnectorTrack(TrackId)
    {
      this.ConnectorTracIdsubject.next(TrackId);
    }


    statusOpeningAcco() {
      this.subject.next(null);
    }

    getStatusAcco(): Observable<any> {
      return this.subject.asObservable();
    }

    SaveConnectorTrack(connectorTrackUrl){
      return this.objApi.callPost(this.saveConnTrackUrl,connectorTrackUrl);
    }

    GetConnectorTrack(model:any)
    {
      return this.objApi.callPost(this.getConnectorTrackUrl,model);
    }
    GetConnectorTrackHistoryList(model:any)
    {

      return this.objApi.callPost(this.getConnectorTracHistoryUrl,model);
    }




    ConnectorHistoryListRefresh() {
      this.ConnectorTracIdsubject.next(null);
    }
}
