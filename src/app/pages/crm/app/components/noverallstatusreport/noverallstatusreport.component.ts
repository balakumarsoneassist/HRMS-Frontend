import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../../services/report/reportservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchpipePipe } from "../../pipe/searchpipe.pipe";
@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, SearchpipePipe],
  selector: 'app-noverallstatusreport',
  templateUrl: './noverallstatusreport.component.html',
  styleUrls: ['./noverallstatusreport.component.css']
})
export class NoverallstatusreportComponent implements OnInit {
  StatusList: any;
  StatusType:string = "";
  searchStr:string;
  constructor(private _objRepService:ReportService,private router: Router ) {
    this.searchStr = "";
  }
  statusFilter: any
  ngOnInit(): void {
    localStorage.setItem('statustype',"");
    localStorage.setItem('statuscode', "");
    localStorage.setItem('statustype', "");
    localStorage.setItem('followerName', "");
    this.GetStatusList();
  }
  GetStatusList() {
    this._objRepService.getOverAllStatusReport().subscribe(
      response => {
        this.StatusList = response

        console.log(response)
        console.log('overallreport')

      },
      error => alert('InternalServer Error')
    )
  }



  callStatus(scode,stype) {//,TrackNumber
   // let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
   // leadFormModel.style.display = "flex";

    this._objRepService.statusOpeningAcco();
    this._objRepService.SendStatusCode(scode);

    localStorage.setItem('statuscode', scode);
    localStorage.setItem('statustype', stype);
    //console.log('venkat');
    if ((scode < 11) || (scode == 22))
    {
      console.log('call contact');
      this.router.navigate(['home/ncfallreport']);
    }
    else {
      console.log('call lead');
      this.router.navigate(['home/nlfallreport']);
    }

  }

}
