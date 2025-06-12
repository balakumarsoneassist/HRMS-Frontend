import { Component, OnInit } from '@angular/core';
import { LeadCreateParam } from '../model/leadcreation/leadcreate';
import { LeadcreationService } from '../services/leadcreation/leadcreationservice';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";
import { CalendarModule } from 'primeng/calendar';

@Component({
    imports: [CommonModule, FormsModule, SearchpipePipe,CalendarModule],
    standalone: true,
  templateUrl: './leadcreator.component.html',
  styleUrls: ['./leadcreator.component.css']
})
export class LeadcreatorComponent implements OnInit {
  searchStr:string;
  model:LeadCreateParam;

  StatusList: any;
  constructor(private lcService:LeadcreationService, private router:Router) {
    this.searchStr = "";
    this.model = new LeadCreateParam;

   }

  ngOnInit(): void {
  }

  GetReport(){

    console.log(this.model)
        this.lcService.getLeadcreateReport(this.model).subscribe(
          response => {
         //   console.log('----yes----')
            console.log(response);
            this.StatusList = response

          },
          error => alert('InternalServer Error')
        )

  }

  getDetails(id:any,name:any){

      localStorage.setItem('empid1', id);
      localStorage.setItem('followerName1',name)
      localStorage.setItem('fdt',this.model.Frdt)
      localStorage.setItem('tdt',this.model.Todt)
      //localStorage.setItem(tdt,this.model)
      console.log('venkat---' + id);

      this.router.navigate(['home/leadbyeid']);




  }

}
