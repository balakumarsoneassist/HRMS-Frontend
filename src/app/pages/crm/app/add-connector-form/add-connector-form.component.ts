import { Component, OnInit } from '@angular/core';
import { connecterService } from '../services/connector/connecterService';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { ConnectorModel } from '../model/Connector/ConnectorModel';
import { Bank } from '../model/bank/bank';
import { BankService } from '../services/bank/bank.service';
import { BranchServiceService } from '../services/branch/branch-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
     standalone: true,
      imports:[CommonModule,FormsModule],
  selector: 'app-add-connector-form',
  templateUrl: './add-connector-form.component.html',
  styleUrls: ['./add-connector-form.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AddConnectorFormComponent implements OnInit {

  SaveLeadDetailsUrl: any;
  model: ConnectorModel;
  BankList:any;
  BranchList:any;


  constructor(private _objConnectorService:connecterService,private _objBankService:BankService,private _objBranchId:BranchServiceService  ,private route: ActivatedRoute ) { this.model=new ConnectorModel}

  ngOnInit(): void {
    this.GetBankNameList();
    this.GetBranchList();
  }

  SaveConnectorDetail() {
    this._objConnectorService.saveConnectorDetail(this.model).subscribe(
      response => {
       if(response==true)
       {
        alert('Save Successfully')
       }
       else{
        alert("Already Exist");
      }
      },
      error => alert("Can't Save")
    )
  }
  GetBankNameList(){
    this._objBankService.GetBankList().subscribe(
      response => {
          this.BankList=response;
      },
      error => alert('InternalServer Error')
    )
  }
  GetBranchList(){
    this._objBranchId.GetBranchList().subscribe(
    response => {
      console.log(response)
      this.BranchList=response;
    },
    error => alert('InternalServer Error')
    )
  }
}

