import { Component, OnInit } from '@angular/core';
import { Extcustomer } from '../model/extcustomer/extcustomer';
import { TrackExtCust } from '../model/extcustomer/extcustomer';
import { ExtCustomerService } from '../services/extcustomer/extcustomer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
      imports:[CommonModule,FormsModule],
  selector: 'app-customerext',
  templateUrl: './customerext.component.html',
  styleUrls: ['./customerext.component.css']
})
export class CustomerextComponent implements OnInit {
  model:any;
  paraModel: TrackExtCust = new TrackExtCust;
  custdatalist:any;
  constructor(private objExtCustService:ExtCustomerService) {
    this.model = new Extcustomer();
  }

  ngOnInit(): void {
    this.objExtCustService.ExtCutomerIdObservable.subscribe(response=>{
   //   console.log(response+'-------QWE')
      this.GetExtCustData(response); // ie from id, here response is id
    })
  }
  GetExtCustData(Id:any)
  {
     // console.log(Id+'-------QWE2')
     this.paraModel.Id = Id;
   //console.log(this.paraModel + '----QWE3')
   this.objExtCustService.GetExtCustomer(this.paraModel).subscribe(
    response => {
      console.log(response)
        //this.model=response;
        this.custdatalist = response;
        this.DataFill();

    },
    error => alert('Internal Server Error')
  )

  }
  updateData(){

  this.objExtCustService.UpdateExtCustomer(this.model).subscribe(
    response => {
      console.log(response)
        //this.model=response;
        if (response) {
          alert("Data Updated ...!");
          this.CloseCustomerModel();
        }
        else { alert("Error While Update...!")}

    },
    error => alert('Internal Server Error')
  )
   }

  DataFill(){
    for(let i=0; i<this.custdatalist.length; i++) {
     //console.log(this.ChildList[i].chseckey)
     this.model.Id = this.custdatalist[i].Id;
     this.model.Name = this.custdatalist[i].name;
     this.model.mobilenumber =this.custdatalist[i].mobilenumber;
     this.model.location =this.custdatalist[i].location;
     const date = this.cnvertToDate(this.custdatalist[i].loandate);

    // console.log(date);
     this.model.loandate =date;
     this.model.email =this.custdatalist[i].email;
     this.model.bank =this.custdatalist[i].bank;
     this.model.amount =this.custdatalist[i].amount;
     this.model.notes =this.custdatalist[i].notes;
     this.model.product =this.custdatalist[i].product;
     this.model.roi =this.custdatalist[i].roi;
     this.model.tracknumber =this.custdatalist[i].tracknumber;

    }

   }

   cnvertToDate(dt:any){
    let spData = dt.split("  ",3);
    console.log(spData);
    var mon = "";
    if (spData[0] == "Jan") {mon="01";}
    else if (spData[0] == "Jan") {mon="01";}
    else if (spData[0] == "Feb") {mon="02";}
    else if (spData[0] == "Mar") {mon="03";}
    else if (spData[0] == "Apr") {mon="04";}
    else if (spData[0] == "May") {mon="05";}
    else if (spData[0] == "Jun") {mon="06";}
    else if (spData[0] == "Jul") {mon="07";}
    else if (spData[0] == "Aug") {mon="08";}
    else if (spData[0] == "Sep") {mon="09";}
    else if (spData[0] == "Oct") {mon="10";}
    else if (spData[0] == "Nov") {mon="11";}
    else if (spData[0] == "Dec") {mon="12";}
    var dd = "";
    var spData1 = spData[1].split(" ",2);
    dd = spData1[0];
    var yyyy = spData1[1];
    var dtnew = dd + "/" + mon + "/" + yyyy;
    return dtnew;
   }

   CloseCustomerModel() {
    let customerModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
    customerModel.removeAttribute('style');
  }
}


