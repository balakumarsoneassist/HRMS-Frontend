import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee/employee.service';
import { TargetEntryModel } from '../model/revenue/revenuemodel';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevenuetargetListComponent } from "../revenuetarget-list/revenuetarget-list.component";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, RevenuetargetListComponent],
  selector: 'app-revenuetarget-entry',
  templateUrl: './revenuetarget-entry.component.html',
  styleUrls: ['./revenuetarget-entry.component.css']
})
export class RevenuetargetEntryComponent implements OnInit {
  model:TargetEntryModel = new TargetEntryModel();
  EmpList:any;
  constructor(private _objEmpService:EmployeeService, private objRevenueSer:RevenueProductService) { }

  ngOnInit(): void {
    this.GetEmpNameList();
    this.model.id = 0;
    this.objRevenueSer.TargetidSendObservable.subscribe(response=>{
    //   console.log(response+'-------QWE')

      // this.model.id = response;// ie from id, here response is id
       //console.log(this.model);
       this.FillTargetmaster(response);

     })
  }

  GetEmpNameList(){
    this._objEmpService.GetActiveEmpList().subscribe(
      response => {
          this.EmpList=response;
        //  console.log(this.EmpList);
      },
      error => alert('InternalServer Error')
    )
  }

  SaveTarget() {
    var tm = this.model.empid + this.model.month + this.model.year;
    this.model.eidMY = tm;
    if (this.model.id > 0) {
      if ( confirm('Are you sure to modify exisiting Record?')) {
        this.objRevenueSer.SaveRevenueTarget(this.model).subscribe(
          response => {
            if(response == true) {

             alert(" Saved Sucessfully");
             window.location.reload();

             }

          },
          error => alert('Cant Save master')
        )
      }
    }
    else {
      this.objRevenueSer.SaveRevenueTarget(this.model).subscribe(
        response => {
          if(response == true) {

           alert(" Saved Sucessfully");
           window.location.reload();

           }
           else {
            alert('Record already available.....!');
           }

        },
        error => alert('Cant Save master -- May be record already available..')
      )
    }
   // console.log(this.model);

  }

  changeEname(e) {

   // console.log(e.target.value);
   // console.log(e.target.selectedIndex);

    for(var i=0; i<this.EmpList.length; i++)
    {
      if (i == e.target.selectedIndex) {
        this.model.empid = this.EmpList[i].Id;
        this.model.ename = this.EmpList[i].EmpName;
        console.log(this.model);
      }
    }

  }

  FillTargetmaster(res:any) {
    var tmp = res.split('**');
    this.model.id = tmp[0];
    this.model.ename = tmp[1];
    this.model.revtarget = tmp[2];
    this.model.fltarget = tmp[3];
  //  console.log(tmp[4])
  //  console.log(tmp[4].length-6)
   // console.log(tmp[4].substring(tmp[4].length - 6,tmp[4].length - 4));
    this.model.empid = tmp[4].substring(0,tmp[4].length - 6);
    this.model.month = tmp[4].substring(tmp[4].length - 6,tmp[4].length - 4);
    this.model.year = tmp[4].substring(tmp[4].length - 4,tmp[4].length);
    console.log(this.model)
  }

}
