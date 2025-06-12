import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { MagarepModel } from '../../model/report/dailyreport';
import { ReportService } from '../../services/report/reportservice';
import { SearchpipePipe } from "../../pipe/searchpipe.pipe";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, SearchpipePipe],
  selector: 'app-nlfallstatusreport',
  templateUrl: './nlfallstatusreport.component.html',
  styleUrls: ['./nlfallstatusreport.component.css']
})
export class NlfallstatusreportComponent implements OnInit {
  StatusList: any;
  StatusType:any = "";
  resInpModel:MagarepModel = {} as MagarepModel;
  scode!:number;
  searchStr:string;
  constructor(private _objRepService:ReportService,private router: Router  ) {
    this.searchStr = "";
  }
  connectorFilter: any
  ngOnInit(): void {

  /*  this._objRepService.StatusSendObservable.pipe(
      switchMap(x => {
        this.resInpModel.statuscode = x;
        this.resInpModel.Empid = 0;
        console.log(this.resInpModel)
        return this._objRepService.getLFAllStatusReport(this.resInpModel)
      })
    ).subscribe(response => {
      this.StatusList = response;
      // log in subscribe, not set till it finishes executing.
      console.log(this.resInpModel.statuscode);
      console.log(this.StatusList);
      console.log('end6565')
    });*/
    this.StatusType = localStorage.getItem('statustype');
    this.scode = Number(localStorage.getItem('statuscode'))
    this. GetLFAllList(this.scode)
  /*  this._objRepService.StatusSendObservable.subscribe(response=>{
     console.log(response + '-----pvr----');
      this. GetLFAllList(response);

     })*/
   // this.GetLFAllList();
  }
  GetLFAllList(code) {
    this.resInpModel.statuscode = code;
    this.resInpModel.Empid = 0;
    console.log(this.resInpModel)
    this._objRepService.getLFAllStatusReport(this.resInpModel).subscribe(
      response => {
     //   console.log('----yes----')
       // console.log(response);
        this.StatusList = response

        //console.log('end')
      },
      error => alert('InternalServer Error')
    )
  }



  callStatus(Id,Ename) {//,TrackNumber
    localStorage.setItem('empid', Id);
    localStorage.setItem('followerName',Ename)
    //console.log('venkat');
    if ((this.scode < 11) || (this.scode == 22))
    {
      console.log('call contact');
      this.router.navigate(['home/ncfempreport']);
    }
    else {
      console.log('call lead');
      this.router.navigate(['home/nlfempreport']);
    }

  }

}
