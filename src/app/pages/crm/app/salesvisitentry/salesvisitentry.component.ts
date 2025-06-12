import { Component, OnInit } from '@angular/core';
import { SalesvisitForm } from '../model/salesvisit/salesvisit';
import { SalesVisitService } from '../services/salesvisit/salesvisit.service';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    standalone: true,
      imports: [CommonModule,FormsModule,ReactiveFormsModule,DatePickerModule],
  selector: 'app-salesvisitentry',
  templateUrl: './salesvisitentry.component.html',
  styleUrls: ['./salesvisitentry.component.css']
})
export class SalesvisitentryComponent implements OnInit {
  model:SalesvisitForm = new SalesvisitForm();
  model1:SalesvisitForm = new SalesvisitForm();

  currentDateTime: any = new Date();

  constructor(private objSalesService:SalesVisitService) { }

  ngOnInit(): void {
  }

  SavesalesVisit(){
    console.log(this.model);
    this.model1.Mobileno = this.model.Mobileno;
    this.model1.Dateofvisit = this.model.Dateofvisit;
    this.model1.Nextvisit = this.model.Nextvisit;
    this.model1.Remarks = this.model.Remarks;
    this.model1.Id = this.model.Id;
  this.objSalesService.SaveSlesVisita(this.model).subscribe(
    response => {
      if(response == true) {
        //alert("Customer Saved Sucessfully");
        this.SaveHistory(this.model);

     /*   this.model.AppoinmentDate = null;
        this.model.Notes = '';
        this.model.Status = null;
        this._objCusttrackservice.SendCustomerTrack(this.model.TrackNumber);*/
       }
       else {
        alert("Mobile no already added..");
      }
    },
    error => alert('Cant Save Customer')
  )
  }

  SaveHistory(m1:any){
    this.objSalesService.SaveSalesVisithistory(this.model1).subscribe(
      response => {
        if(response == true) {

         alert(" Saved Sucessfully");
       /*   this.model.AppoinmentDate = null;
          this.model.Notes = '';
          this.model.Status = null;
          this._objCusttrackservice.SendCustomerTrack(this.model.TrackNumber);*/
         }

      },
      error => alert('Cant Save history')
    )
    }

}
