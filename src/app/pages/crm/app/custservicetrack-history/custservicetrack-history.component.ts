import { Component, OnInit } from '@angular/core';
import { CustomertrackService } from '../services/customertrack/customertrack.service';
import { TrackSVCust } from '../model/salesvisit/salesvisit';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
      imports:[CommonModule,FormsModule],
  selector: 'app-custservicetrack-history',
  templateUrl: './custservicetrack-history.component.html',
  styleUrls: ['./custservicetrack-history.component.css']
})
export class CustservicetrackHistoryComponent implements OnInit {

  trackParameter:TrackSVCust= new TrackSVCust;
  CustomerTrackList:any;
  name!:string;
  mno!:string;
  constructor(private objCustSer:CustomertrackService) { }

  ngOnInit(): void {
    this.objCustSer.custidSendObservable.subscribe(response=>{
      //   console.log(response + " test3")
         this.GetServiceCallList(response);
       })
  }

  GetServiceCallList(Id:any)
  {
  var tmp = Id.split('**');
 // console.log(tmp);
  this.name= tmp[1];
  this.mno = tmp[2];
  this.trackParameter.Custid=tmp[0];
  this.objCustSer.GetServiceCallList(this.trackParameter).subscribe(
    response => {
      console.log(response)
        this.CustomerTrackList=response;
    },
    error => alert('Internal Server Error')
  )
  }
}
