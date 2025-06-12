import { Component, OnInit } from '@angular/core';
import { ServiceTrackForm } from '../model/extcustomer/extcustomer';
import { CustomertrackService } from '../services/customertrack/customertrack.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';


@Component({
    standalone: true,
      imports:[CommonModule,FormsModule,CalendarModule],
  selector: 'app-custservicetrack-entry',
  templateUrl: './custservicetrack-entry.component.html',
  styleUrls: ['./custservicetrack-entry.component.css']
})
export class CustservicetrackEntryComponent implements OnInit {

  model:ServiceTrackForm = new ServiceTrackForm();
  custid!:number;
  currentDateTime: any = new Date();
  constructor(private objCustservice:CustomertrackService) { }

  ngOnInit(): void {
     //pass cust id and get data from custtrack table
     this.objCustservice.custidSendObservable.subscribe(response=>{
      // console.log(response+'-------QWE')
       var tmpid = response.split('**')
       this.custid = tmpid[0];// ie from id, here response is id

     })
  }

  SaveHistory(){
    this.model.Id = this.custid;
    this.objCustservice.SaveServiceCallhistory(this.model).subscribe(
      response => {
        if(response == true) {

         alert(" Saved Sucessfully");
         this.closeModel();
       /*   this.model.AppoinmentDate = null;
          this.model.Notes = '';
          this.model.Status = null;
          this._objCusttrackservice.SendCustomerTrack(this.model.TrackNumber);*/
         }

      },
      error => alert('Cant Save history')
    )
    }

    closeModel() {
      //let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
      let customerModel = document.querySelector('.callHistoryModel1') as HTMLInputElement;
     // customerModel.style.display = "flex";
      //leadFormModel.removeAttribute('style');
      customerModel.removeAttribute('style');
    }

}
