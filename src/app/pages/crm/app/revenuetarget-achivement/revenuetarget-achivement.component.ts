import { Component, OnInit } from '@angular/core';
import { AchieveParamModel } from '../model/revenue/revenuemodel';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';
import { LoaderService } from "../services/loader/loader.service";

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevenuetargetDetailsComponent } from "../revenuetarget-details/revenuetarget-details.component";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, RevenuetargetDetailsComponent],
  selector: 'app-revenuetarget-achivement',
  templateUrl: './revenuetarget-achivement.component.html',
  styleUrls: ['./revenuetarget-achivement.component.css']
})
export class RevenuetargetAchivementComponent implements OnInit {
  pmodel:AchieveParamModel = new AchieveParamModel();
  AchieveList:any;
  rmon:string = "";
  rfyr:string = "";
  loadSpin:number = 0;
  constructor(private objRevenueSer:RevenueProductService, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.pmodel.month = '01';
    this.pmodel.year = 2020;
    this.pmodel.fyear = '2019-2020';
  }

  changeMonth(e) {

   //  console.log(e.target.value);
     var yr=this.pmodel.year;
    this.SetFinYear(e.target.value,yr);
    // console.log(e.target.selectedIndex);
  }

  changeYear(e) {

 //   console.log(e.target.value);
    var m=this.pmodel.month;
    this.SetFinYear(m,e.target.value);
   // console.log(e.target.selectedIndex);
 }

 SetFinYear(mon:any,yr:any){
  var m= Number(mon);
  var yr1 = Number(yr);
  var f1 = '';var f2 = '';
  var fyr = '';
  if(m >= 4) {
    f1 = yr;
    f2 = (yr1 + 1).toString();
  }
  else if (m < 4) {
    f2 = yr;
    f1 = (yr1 - 1).toString();
  }

  fyr = f1 + '-' +f2;
  this.pmodel.fyear = fyr;

 }

 Getdata() {
  this.rmon = this.pmodel.month + " - " +this.pmodel.year;
  this.rfyr = this.pmodel.fyear;
  let type : any = localStorage.getItem('usertype');
  this.pmodel.type=   type
  this.loadSpin = 1;console.log(this.pmodel)
  this.objRevenueSer.GetTargetAchievement(this.pmodel).subscribe(
    response => {
      console.log(response);

      this.AchieveList = response;
      this.loadSpin = 0;//alert(this.loadSpin)
    })

}



    Getdetails(eid:number,name:string) {
      if (eid == null){eid=0;}
      console.log(eid)
      var tmp = eid + '**' + name + '**' + this.rfyr;
      let customerModel1 = document.querySelector('.callHistoryModel1') as HTMLInputElement;
    // alert(customerModel1)
      customerModel1.style.display = "flex";
      this.objRevenueSer.statusOpeningAcco1();
      this.objRevenueSer.SendEmpId(tmp);
    }



}


