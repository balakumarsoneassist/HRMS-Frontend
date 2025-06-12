import { Component, OnInit } from '@angular/core';
import { RevenueProductService } from '../services/revenueproduct/revenue.service';
import { TargetParamModel } from '../model/revenue/revenuemodel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
      imports: [CommonModule,FormsModule],
  selector: 'app-revenuetarget-list',
  templateUrl: './revenuetarget-list.component.html',
  styleUrls: ['./revenuetarget-list.component.css']
})
export class RevenuetargetListComponent implements OnInit {
  TargetList:any;
  pmodel:TargetParamModel = new TargetParamModel();
  constructor(private objRevenueSer:RevenueProductService) { }

  ngOnInit(): void {

  }


  EditTarget(id:any,ename:any,rt:any,flt:any,eidmy:any) {
    this.objRevenueSer.statusOpeningAcco();
    var allparam = id+'**'+ename+'**'+rt+'**'+flt+'**'+eidmy;
    this.objRevenueSer.SendTargetId(allparam);

  }

  Getdata() {
   // console.log(this.pmodel)
    this.objRevenueSer.GetTargetlist(this.pmodel).subscribe(
      response => {
      //  console.log(response)
        this.TargetList = response;

      })

  }
}
