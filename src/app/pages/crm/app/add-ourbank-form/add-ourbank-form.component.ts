import { Component, OnInit } from '@angular/core';
import { OurBankMasterModel } from '../model/ourbank/ourbank';
import { OurbankService } from '../services/ourbank/ourbank.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';   // ✅ Add this
import { InputTextModule } from 'primeng/inputtext'; // ✅ For styled inputs
import { ButtonModule } from 'primeng/button';       // ✅ For PrimeNG buttons


@Component({
     standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, InputTextModule, ButtonModule],
  selector: 'app-add-ourbank-form',
  templateUrl: './add-ourbank-form.component.html',
  styleUrls: ['./add-ourbank-form.component.css']
})
export class AddOurbankFormComponent implements OnInit {

  model:OurBankMasterModel;
  constructor(private objOurBankService:OurbankService) {
    this.model = new OurBankMasterModel();
   }

  ngOnInit(): void {
    this.objOurBankService.OurBankSubjectObservable.subscribe(response=>{
      console.log(response)
      if(response>0)
      {
        this.GetOurBankDetail(response);
      }
      else {
        this.model.Id = 0;
        this.model.Bankname = '';
        this.model.Code = '';
        this.model.Expiredt =  new Date();
      }



      })
  }

  ourbankSubmit(){
    console.log(this.model)
    console.log('ree')
    this.objOurBankService.SaveOurBankDetails(this.model).subscribe(
      response => {
     //   alert(response);
        if(response == true) {
        alert("Ourbank details added Sucessfully");
        window.location.reload();
         }
         else{
           alert(response);
         }
      },
      error => alert('Cant Save')
    )
  }

  GetOurBankDetail(id:any) {
  //  console.log(id)
    this.model.Id = id;
    this.objOurBankService.GetOurBankById(this.model).subscribe(
      response => {
    //    console.log(response)
        this.model=response[0];
      },
      error => alert('Cant Save')
    )
  }

}
