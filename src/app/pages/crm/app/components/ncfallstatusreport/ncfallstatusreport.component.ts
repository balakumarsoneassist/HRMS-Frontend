import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../../services/report/reportservice';
import { MagarepModel } from '../../model/report/dailyreport';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchpipePipe } from '../../pipe/searchpipe.pipe';

@Component({
standalone: true,
  imports:[CommonModule,FormsModule,SearchpipePipe],
  selector: 'app-ncfallstatusreport',
  templateUrl: './ncfallstatusreport.component.html',
  styleUrls: ['./ncfallstatusreport.component.css']
})
export class NcfallstatusreportComponent implements OnInit {

  StatusList: any;
  StatusType:any = "";

  resInpModel:MagarepModel = {} as MagarepModel;
  scode!:number;
  searchStr:string;
  constructor(private _objRepService:ReportService,private router: Router ) {
    this.searchStr = "";
  }
  connectorFilter: any
  ngOnInit(): void {

    this.StatusType = localStorage.getItem('statustype');
    this.scode = Number(localStorage.getItem('statuscode'))
    this. GetLFAllList(this.scode)

  }
  GetLFAllList(code) {
    this.resInpModel.statuscode = code;
    this.resInpModel.Empid = 0;
    console.log(this.resInpModel)
    this._objRepService.getCFAllStatusReport(this.resInpModel).subscribe(
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
    if (this.scode < 11)
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
