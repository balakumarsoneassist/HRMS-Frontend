import { Component, OnInit } from '@angular/core';
//import { Icici } from '../model/Icici/icici';
//import { IciciService } from '../services/Icici/icici.service';
import { BajajService } from '../services/bajaj/bajaj.service';
import { BajajModel } from '../model/bajaj/bajaj';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';


@Component({
  standalone: true,
  imports:[CommonModule,FormsModule],
  selector: 'app-add-bajaj-form',
  templateUrl: './add-bajaj-form.component.html',
  styleUrls: ['./add-bajaj-form.component.css']
})
export class AddBajajFormComponent implements OnInit {

  model: BajajModel;
  constructor(private _objBajajSer:BajajService) {this.model=new BajajModel }


  ngOnInit(): void {
    this._objBajajSer.BajajSubjectObservable.subscribe(response=>{
    if(response>0)
    {
      this.GetBajajLeadDetail(response);
    }

    })
  }
  AssignLeadToBajaj() {
     var displayName=this.model.firstName;
     this.model.phoneNumber = this.model.mobileNumber;
     this.model.phoneTypeCode = "MOBILE";
     this.model.priority = 5;

     this.model.em1priority = 5;
     this.model.memailId1 = this.model.emailId;
     this.model.emailTypeCode = "PERSONAL";

     this.model.memailId2 = this.model.offemailId;
     this.model.memailTypeCode = "OFFICE"
     this.model.emlpriority2 = 4;

     this.model.employmentType = "SALARIED"; //"SEP" FOR self employed prof.


     this.model.businessVertical = "SEBC";
     this.model.offerProduct ="HHL";

     this.model.leadSource = "ONLINE";
     this.model.processType = "";

     this.model.offerName = "Campaign PO";
     this.model.loanType = "HHL";

     this.model.baseProduct = "PROSPECT";
     this.model.bT = "Fresh";

     this.model.extCustSeg ="NEW";

     this.model.productOfferSource = "";

     this.model.utmSource ="EREF";  //"WEBSITE";
     this.model.utmMedium ="ORGANIC";

     this.model.utmContent = "ONEASSIST";

     this.model.appliedLoanAmount = this.model.appliedLoanAmount * 100;

     this.model.leadId = this.model.leadId;

     console.log(this.model);


    this._objBajajSer.AssignLeadToBajaj(this.model).subscribe(
      response => {
       // alert(response);
        if(response == true) {
        alert(displayName + " assigned Sucessfully");
         }
         else{
           alert(response);
         }
      },
      error => alert('Cant Save')
    )
  }

  GetBajajLeadDetail(Id)
  {
    this._objBajajSer.GetBajajLead(Id).subscribe(
      response => {
        this.model=response[0];
      },
      error => alert('Cant Save')
    )
  }
}
