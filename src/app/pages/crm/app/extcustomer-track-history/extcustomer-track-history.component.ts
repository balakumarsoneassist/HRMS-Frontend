import { Component, OnInit } from '@angular/core';
import { CustomertrackService } from '../services/customertrack/customertrack.service';
import { TrackExtCust } from '../model/extcustomer/extcustomer';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
  selector: 'app-extcustomer-track-history',
  templateUrl: './extcustomer-track-history.component.html',
  styleUrls: ['./extcustomer-track-history.component.css']
})
export class ExtcustomerTrackHistoryComponent implements OnInit {
  CustomerTrackList:any;
  trackParameter:TrackExtCust = new TrackExtCust;
  constructor(private service:CustomertrackService) { }

  ngOnInit(): void {
    this.service.CustTrackSubjectObservable.subscribe(response=>{
      console.log(response + " test3")
      this.GetCustomerTrackHistoryList(response);
    })
  }
  GetCustomerTrackHistoryList(TrackId)
  {
  this.trackParameter.Id=TrackId;
  this.service.GetCustomerTrackHistoryList(this.trackParameter).subscribe(
    response => {
      console.log(response)
        this.CustomerTrackList=response;
    },
    error => alert('Internal Server Error')
  )
  }


}
