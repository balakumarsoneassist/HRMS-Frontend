import { Component, OnInit } from '@angular/core';
import { TrackIdModel } from '../model/lead/lead-model';
import { connecterService } from '../services/connector/connecterService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
      imports:[CommonModule,FormsModule],
  selector: 'app-connector-track-history',
  templateUrl: './connector-track-history.component.html',
  styleUrls: ['./connector-track-history.component.css']
})
export class ConnectorTrackHistoryComponent implements OnInit {

  ConnectorTrackList:any;
  trackParameter:TrackIdModel;
  constructor(private service: connecterService) {
    this.trackParameter=new TrackIdModel;
   }

  ngOnInit(): void {
    this.service.ConnectorTrackIdObservable.subscribe(response=>{

      this.GetConnectorTrackHistoryList(response);
    })
  }
  GetConnectorTrackHistoryList(ConnectorId)
  {

  this.trackParameter.ConnectorId=ConnectorId;
  this.service.GetConnectorTrackHistoryList(this.trackParameter).subscribe(
    response => {
        this.ConnectorTrackList=response;
        console.log(response)
    },
    error => alert('Internal Server Error')
  )
  }

}
