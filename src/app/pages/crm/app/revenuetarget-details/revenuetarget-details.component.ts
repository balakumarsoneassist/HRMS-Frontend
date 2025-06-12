import { Component, OnInit } from '@angular/core';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';
import { AchieveParamModel } from '../model/revenue/revenuemodel';
import { LoaderService } from "../services/loader/loader.service";

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, SearchpipePipe],
  selector: 'app-revenuetarget-details',
  templateUrl: './revenuetarget-details.component.html',
  styleUrls: ['./revenuetarget-details.component.css']
})
export class RevenuetargetDetailsComponent implements OnInit {

  empid!:number;
  ename!:string;
  finyear!:string;
  pmodel:AchieveParamModel = new AchieveParamModel();
  AchieveList:any;
  searchStr:string;
  loadSpin:number = 0;
  constructor(private objRevservice:RevenueProductService, public loaderService: LoaderService) {
    this.searchStr = "";
  }

  ngOnInit(): void {
    this.objRevservice.empidSendObservable.subscribe(response=>{
      // console.log(response+'-------QWE')
       var tmpid = response.split('**')
       this.empid = tmpid[0];// ie from id, here response is id
       this.ename = tmpid[1];
       this.finyear = tmpid[2];
       this.loadSpin = 4;
       this.Getdata();
     })
  }

  Getdata() {
    this.pmodel.EmpId = this.empid;
    this.pmodel.fyear = this.finyear;
      let type : any = localStorage.getItem('usertype');
  this.pmodel.type=   type
   // alert(this.loadSpin)
    this.objRevservice.GetTargetAchievementByemp(this.pmodel).subscribe(
      response => {
        console.log(response);
        this.AchieveList = response;
        this.loadSpin = 0;
      },
      error => alert('Server Error..')

      )

  }

  closeModel() {
    let customerModel = document.querySelector('.callHistoryModel1') as HTMLInputElement;
    customerModel.removeAttribute('style');
  }




}
