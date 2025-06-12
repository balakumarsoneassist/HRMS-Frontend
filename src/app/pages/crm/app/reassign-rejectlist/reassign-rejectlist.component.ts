import { Component, OnInit } from '@angular/core';

import { ReassignService } from '../services/reassignreport/reassignservice';


import { Router } from '@angular/router';

import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import { EmployeeService } from '../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { RejectbyModel, RejectInpModel } from '../model/report/dailyreport';
import { ContactService } from '../services/contact/contact.service';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";
import { CallTrackHistoryComponent } from "../call-track-history/call-track-history.component";
import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, ReactiveFormsModule, SearchpipePipe, CallTrackHistoryComponent, LeadFormModelComponent],
  selector: 'app-reassign-rejectlist',
  templateUrl: './reassign-rejectlist.component.html',
  styleUrls: ['./reassign-rejectlist.component.css']
})
export class ReassignRejectlistComponent implements OnInit {

  StatusList: any;
  StatusType:string = "";

  Reject_list ;any = [];

  inpModel: RejectInpModel = {} as RejectInpModel;

  rmodel:RejectbyModel = {} as RejectbyModel;

  chkstatus:boolean = false;

  searchStr:string;
  rejEmpList:any;
  EmpList:any;
  fcemp : any = new FormControl('');
  fcContactfby : any = new FormControl('');
  constructor(private _objRepService:ReassignService,private router: Router,private contactSevice: ContactService,private _objEmpService:EmployeeService  ) {
    this.searchStr = "";
   }
  connectorFilter: any
  ngOnInit(): void {

    this.getRejectedbylist();
    this.GetEmpNameList();

  //  this.GetRejectList()
  /*  this._objRepService.StatusSendObservable.subscribe(response=>{
     console.log(response + '-----pvr----');
      this. GetLFAllList(response);

     })*/
   // this.GetLFAllList();
  }
  GetRejectList() {
    this.rmodel.empid = this.fcemp.value;
//console.log(this.rmodel)
    this._objRepService.getrejectListReport(this.rmodel).subscribe(
      response => {
     //   console.log('----yes----')
  //      console.log(response);
        this.StatusList = response
        //console.log('end')
      },
      error => alert('InternalServer Error')
    )
  }

  getRejectedbylist(){
    this._objRepService.getrejectbyempList().subscribe(
      response => {
          this.rejEmpList=response;
   //       console.log(this.rejEmpList);
      },
      error => alert('InternalServer Error')
    )
  }


  callStatus(TrackId: string, Id) {
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.style.display = "flex";
    console.log(Id + "------" + TrackId);
    this.contactSevice.SendLeadId(Id);
    this.contactSevice.SendLeadTrack(TrackId);
  }

OpenTrackHistoryModel(TrackNumber) {
    let leadFormModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
    leadFormModel.style.display = "flex";
    this.contactSevice.SendLeadTrack(TrackNumber);
  }
  CloseTrackHistoryModel() {
    let leadFormModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
    leadFormModel.removeAttribute('style');
  }

/*
  onCheckUser(Id:any, event:any) {
    const checked = event.target.checked; // stored checked value true or false
     if (checked) {
       this.Reject_list.push(Id); // push the Id in array if checked
        } else {
        const index = this.Reject_list.findIndex(Id);//Find the index of stored id
        this.Reject_list.splice(index, 1); // Then remove
      }
   }*/

   selChk(val:any) {

    var index = this.Reject_list.indexOf(val);
    if(index === -1){
      // val not found, pushing onto array
      this.Reject_list.push(val);
    }else{
      // val is found, removing from array
      this.Reject_list.splice(index,1);
    }
    //alert(this.Reject_list)
   }




  checkAllCheckBox(ev: any) { // Angular 13
    if (this.StatusList != null) {
		this.StatusList.forEach(x => x.checkstatus = ev.target.checked)
    //alert(ev.target.checked)
    this.processChecked(ev.target.checked);
    }
	}

	isAllCheckBoxChecked() {
    if (this.StatusList!= null) {
		return this.StatusList.every(p => p.checkstatus);
  }
	}

  processChecked(val:boolean) {

    if(val){
      this.Reject_list.splice(0,this.Reject_list.length);
      for(var j=0; j<this.StatusList.length; j++){
        this.Reject_list.push(this.StatusList[j].id);
      }

    }
    else {
      this.Reject_list.splice(0,this.Reject_list.length);
    }
   // alert(this.Reject_list)
  }

  Reassign(){
    var selval = "";
    if (this.fcemp.value == this.fcContactfby.value) {
      alert("Rejected by and Assigned to are Same...!")
    }
    else
    {
          if (this.Reject_list.length == 0) {
            alert('Pls select atleast one record...');
          }
          else {
            for(var k=0; k<this.Reject_list.length; k++){
              if (selval == ""){
                selval = this.Reject_list[k];
              }
              else{
                selval = selval + "," + this.Reject_list[k];
              }
              if  (k > 100) {
                break;
              }
          }
          this.inpModel.followedby = this.fcContactfby.value;
            this.inpModel.selvalues = selval;
            this.Reject_list.splice(0,this.Reject_list.length);
            this._objRepService.reassignRecords(this.inpModel).subscribe(
              response => {
            //   console.log('----yes----')
                console.log(response);
                if (response) {
                  alert("Records Reassigned...!");
                  this.GetRejectList();
                }
                else {
                  alert("Err while Reassign..")
                }
              // this.StatusList = response
                //console.log('end')
              },
              error => alert('InternalServer Error')
            )

          }
          //alert(selval)
      }

  }

  GetEmpNameList(){
    this._objEmpService.GetActiveEmpList().subscribe(
      response => {
          this.EmpList=response;
          console.log(this.EmpList);
      },
      error => alert('InternalServer Error')
    )
  }

}
