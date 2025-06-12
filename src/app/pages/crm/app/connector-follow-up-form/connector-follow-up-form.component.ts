import { Component, OnInit } from '@angular/core';
import { ConnecterFollowUp } from '../model/Connector/connector-follow-up';
import { connecterService } from '../services/connector/connecterService';
import { ConnecterTrack } from '../model/Connector/connector-follow-up';
import { ConnectorModel } from '../model/Connector/ConnectorModel';
import { ConnectorResModel } from '../model/Connector/Connector-res';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
@Component({
    standalone: true,
  imports:[CommonModule,FormsModule,CalendarModule],
  selector: 'app-connector-follow-up-form',
  templateUrl: './connector-follow-up-form.component.html',
  styleUrls: ['./connector-follow-up-form.component.css']
})
export class ConnectorFollowUpFormComponent implements OnInit {
  model: ConnecterFollowUp = new ConnecterFollowUp();
  cresmodel: ConnectorResModel = new ConnectorResModel();
  currentDateTime: any = new Date();
  trackParameter: ConnecterTrack = new ConnecterTrack();
  ConnectorName:string = '';
  ConnectorId:number = 0;
  res:any;
  constructor(private service: connecterService) { }

  ngOnInit(): void {
/*  this.service.ConnectorTrackIdObservable.subscribe(response=>{
    this. GetConnector(response);
   })
  */
   this.service.ConnectorSendObservable.subscribe(response=>{
    this. GetConnector(response);
    console.log(response)
   })
  // console.log('pvr---' + this.res)
   //this.GetConnector(this.res);
  }

  SaveConnectorTrack(IsClose)
{
 //alert(this.ConnectorId)
  this.model.ConnectorId = this.ConnectorId;
  //console.log(this.model);
  this.service.SaveConnectorTrack(this.model).subscribe(
    response => {
      if(response == true) {
        alert(" Saved Sucessfully");
        this.model.AppoinmentDate = new Date();
        this.model.Notes = '';
       // this.model.ConnectorId = null;
        this.model.Remarks = '';
        //this.service.ConnectorHistoryListRefresh();
        if(IsClose==true)
        {
          this.closeModel();
        }
         }
    },
    error => alert('Cant Save')
  )
}

closeModel() {
  let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
  leadFormModel.removeAttribute('style');
}

GetConnector(Id)
{
  //alert(Id);
  this.trackParameter.ConnectorId=Id;
  this.service.GetConnectorTrack(this.trackParameter).subscribe(
    response => {
       // console.log(response[0])
        this.cresmodel.FirstName=response[0].FirstName;
        this.cresmodel.Id = response[0].Id;
        this.ConnectorName = this.cresmodel.FirstName;
      //  console.log(this.cresmodel.FirstName)


    },
    error => alert('Internal Server Error')
  )
  this.ConnectorName = this.cresmodel.FirstName;
  this.ConnectorId = Id;
   //alert(Id)
  }


}
