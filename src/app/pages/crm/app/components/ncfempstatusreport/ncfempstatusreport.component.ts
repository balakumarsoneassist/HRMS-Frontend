import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report/reportservice';
import { MagarepModel } from '../../model/report/dailyreport';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact/contact.service';
import { SearchpipePipe } from "../../pipe/searchpipe.pipe";
import { CallTrackHistoryComponent } from "../../call-track-history/call-track-history.component";
import { LeadFormModelComponent } from "../../lead-form-model/lead-form-model.component";
@Component({
    standalone: true,
  imports: [CommonModule, FormsModule, SearchpipePipe, CallTrackHistoryComponent, LeadFormModelComponent],
  selector: 'app-ncfempstatusreport',
  templateUrl: './ncfempstatusreport.component.html',
  styleUrls: ['./ncfempstatusreport.component.css']
})
export class NcfempstatusreportComponent implements OnInit {
  StatusList: any;
  StatusType:any = "";
  FollowerName:any = "";
  resInpModel:MagarepModel = {} as MagarepModel;
  scode!:number;
  empid!:number
  searchStr:string;
  constructor(private _objRepService:ReportService,private router: Router,private contactSevice: ContactService  ) {
    this.searchStr = "";
   }
  connectorFilter: any
  ngOnInit(): void {



    this.scode = Number(localStorage.getItem('statuscode'))
    this.empid = Number(localStorage.getItem('empid'))

    this.StatusType = localStorage.getItem('statustype');
    this.FollowerName = localStorage.getItem('followerName');
    this. GetCFEmpList(this.scode,this.empid)
  /*  this._objRepService.StatusSendObservable.subscribe(response=>{
     console.log(response + '-----pvr----');
      this. GetLFAllList(response);

     })*/
   // this.GetLFAllList();
  }
  GetCFEmpList(code,eid) {
    this.resInpModel.statuscode = code;
    this.resInpModel.Empid = eid;
    console.log(this.resInpModel)
    this._objRepService.getempfollowStatusReport(this.resInpModel).subscribe(
      response => {
     //   console.log('----yes----')
        console.log(response);
        this.StatusList = response
        //console.log('end')
      },
      error => alert('InternalServer Error')
    )
  }



  callStatus(TrackId: string, Id) {
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.style.display = "flex";
    console.log(Id + "------" + TrackId);
    this.contactSevice.SendLeadId(Id);
    this.contactSevice.SendLeadTrack(TrackId);
  }

OpenTrackHistoryModel(TrackNumber) {
    let leadFormModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
    leadFormModel.style.display = "flex";
    this.contactSevice.SendLeadTrack(TrackNumber);
  }
  CloseTrackHistoryModel() {
    let leadFormModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
    leadFormModel.removeAttribute('style');
  }

}
