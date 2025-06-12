import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bank } from '../model/bank/bank';
import { BankService } from '../services/bank/bank.service';
import { EmployeeService } from '../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankNameListComponent } from "../bank-name-list/bank-name-list.component";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, BankNameListComponent],
  selector: 'app-add-bank-form',
  templateUrl: './add-bank-form.component.html',
  styleUrls: ['./add-bank-form.component.css']
})
export class AddBankFormComponent implements OnInit {
  model:Bank;
  BankId: any;

  constructor(private _objBankService:BankService, private route: ActivatedRoute, private router : Router) { this.model=new Bank}

  ngOnInit(): void {
    this._objBankService.bankObservable.subscribe(
      response => {
        this.model=response.bankdetail;
      })
    this.BankId = this.route.snapshot.queryParamMap.get('id');
    if(this.BankId!=null){
      this.BankId=this.BankId*1;
      this.GetBankById(this.BankId);
    }

    let acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
       acc[i].addEventListener("click", (event) => {
  const el = event.currentTarget as HTMLElement;
  el.classList.toggle("active");

  const panel :any = el.nextElementSibling as HTMLElement;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
});


    }
  }


  SaveBankDetails() {
    this._objBankService.SaveBankDetails(this.model).subscribe(
      response => {
       if(response==true)
       {
        alert('Save Successfully')
       }
       else{
        alert("Bank Name Already Exist");
      }
      },
      error => alert('Cant Save')
    )
  }
  GetBankById(BankId){
    this._objBankService.GetBankById(BankId).subscribe(
      response => {
        this.model=response[0];
        },
        error => alert('Internal Server Error')
    )
  }


}
