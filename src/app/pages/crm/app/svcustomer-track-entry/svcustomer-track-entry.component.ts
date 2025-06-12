import { Component, OnInit } from '@angular/core';
import { SalesvisitForm } from '../model/salesvisit/salesvisit';
import { SalesVisitService } from '../services/salesvisit/salesvisit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule,DatePickerModule],
  selector: 'app-svcustomer-track-entry',
  templateUrl: './svcustomer-track-entry.component.html',
  styleUrls: ['./svcustomer-track-entry.component.css']
})
export class SvcustomerTrackEntryComponent implements OnInit {
  model:SalesvisitForm = new SalesvisitForm();

  currentDateTime: any = new Date();
  custid!:number;

  constructor(private objSalesService:SalesVisitService) { }

  ngOnInit(): void {
        //pass cust id and get data from custtrack table
        this.objSalesService.custidSendObservable.subscribe(response=>{
            // console.log(response+'-------QWE')
             var tmpid = response.split('**')
             this.custid = tmpid[0];// ie from id, here response is id

           })
  }

  SaveHistory(){
    this.model.Id = this.custid;
    this.objSalesService.SaveSalesVisithistory(this.model).subscribe(
      response => {
        if(response == true) {

         alert(" Saved Sucessfully");
         this.CloseCustomerModel();
       /*   this.model.AppoinmentDate = null;
          this.model.Notes = '';
          this.model.Status = null;
          this._objCusttrackservice.SendCustomerTrack(this.model.TrackNumber);*/
         }

      },
      error => alert('Cant Save history')
    )
    }

    CloseCustomerModel() {
      let customerModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
      customerModel.removeAttribute('style');
    }

}
