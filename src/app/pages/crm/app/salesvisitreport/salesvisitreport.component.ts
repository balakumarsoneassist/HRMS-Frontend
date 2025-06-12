import { Component, OnInit } from '@angular/core';
import { TrackSVCust } from '../model/salesvisit/salesvisit';
import { SalesVisitService } from '../services/salesvisit/salesvisit.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
      imports: [CommonModule,FormsModule],
  selector: 'app-salesvisitreport',
  templateUrl: './salesvisitreport.component.html',
  styleUrls: ['./salesvisitreport.component.css']
})
export class SalesvisitreportComponent implements OnInit {
  CustomerTrackList:any;
  trackParameter:TrackSVCust= new TrackSVCust;
  name!:string;
  mno!:string;
  constructor(private objSVservice:SalesVisitService) { }

  ngOnInit(): void {
    this.objSVservice.custidSendObservable.subscribe(response=>{
   //   console.log(response + " test3")
      this.GetSVTrackHistoryList(response);
    })
  }

  GetSVTrackHistoryList(Id:any)
  {
  var tmp = Id.split('**');
 // console.log(tmp);
  this.name= tmp[1];
  this.mno = tmp[2];
  this.trackParameter.Custid=tmp[0];
  this.objSVservice.GetSVtrackList(this.trackParameter).subscribe(
    response => {
      console.log(response)
        this.CustomerTrackList=response;
    },
    error => alert('Internal Server Error')
  )
  }

}
