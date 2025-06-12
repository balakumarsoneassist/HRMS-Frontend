import { Component, OnInit } from '@angular/core';
import { CatReportService } from '../services/custcategory/catreportservice';
import { SegmentModel } from '../model/report/dailyreport';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../services/contact/contact.service';
import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";
import { CallTrackHistoryComponent } from "../call-track-history/call-track-history.component";
import { SearchpipePipe } from "../pipe/searchpipe.pipe";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, LeadFormModelComponent, CallTrackHistoryComponent, SearchpipePipe],
  selector: 'app-custratingdetailreport',
  templateUrl: './custratingdetailreport.component.html',
  styleUrls: ['./custratingdetailreport.component.css']
})
export class CustratingdetailreportComponent implements OnInit {
  StatusList: any;

  resInpModel:SegmentModel = {} as SegmentModel;

  custsegtype: any;

  searchStr:string;
  constructor(private _objRepService:CatReportService,private router: Router,private contactSevice: ContactService  ) {
    this.searchStr = "";
  }
  ngOnInit(): void {
    console.log('----yes----')
    this.custsegtype = localStorage.getItem('segname');
    this. GetSegmentwiseList(this.custsegtype);
    // this._objRepService.CatSendObservable.subscribe(response=>{
    //   this.custsegtype = response;
    //   console.log(this.custsegtype);



    //  })



  }
  GetSegmentwiseList(stype:string) {
    this.resInpModel.segment = stype;

   // console.log(this.resInpModel)
    this._objRepService.getSegmentwiseDetailReport(this.resInpModel).subscribe(


    response => {

        this.StatusList = response
   //     console.log('----yes--fine--statuslist....')
        console.log(this.StatusList)
      },
      error => alert('InternalServer Error')
    )
  }





  callStatus(TrackId: string, Id) {
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.style.display = "flex";
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
