import { Component, OnInit } from '@angular/core';
import { LeadCreateParam1 } from '../model/leadcreation/leadcreate';
import { LeadcreationService } from '../services/leadcreation/leadcreationservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, SearchpipePipe],
  selector: 'app-leadsbyempid',
  templateUrl: './leadsbyempid.component.html',
  styleUrls: ['./leadsbyempid.component.css']
})
export class LeadsbyempidComponent implements OnInit {
  searchStr:string;
  model:LeadCreateParam1;
  fdt:any="";
  tdt:any="";
  empid!:number;
  StatusList: any;
  lowner!:any;

  hfdt:string="";
  htdt:string="";

  constructor(private lcService:LeadcreationService) {
    this.searchStr = "";
    this.model = new LeadCreateParam1;
   }

  ngOnInit(): void {
    this.fdt = localStorage.getItem('fdt');
    this.tdt = localStorage.getItem('tdt');

    this.empid = Number(localStorage.getItem('empid1'));
    this.lowner = localStorage.getItem('followerName1');
    localStorage.removeItem('fdt');
    localStorage.removeItem('tdt')
    localStorage.removeItem('empid1')
    localStorage.removeItem('followerName1')

    this.hfdt = this.fdt.substring(0,16)
    this.htdt = this.tdt.substring(0,16)
    this.GetReport();
  }

  GetReport(){

    this.model.Frdt = new Date(this.fdt);
    this.model.Todt = new Date(this.tdt);
    this.model.empid = this.empid;
//console.log(this.model)
        this.lcService.getLeadcreateDetailsReport(this.model).subscribe(
          response => {
         //   console.log('----yes----')
            console.log(response);
            this.StatusList = response

          },
          error => alert('InternalServer Error')
        )

  }

}
