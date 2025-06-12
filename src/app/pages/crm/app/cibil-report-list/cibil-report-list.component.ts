import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CibilService } from '../services/cibil/cibil.service';
import { Cibil } from '../model/cibil/cibil';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CibilReportComponent } from "../cibil-report/cibil-report.component";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, CibilReportComponent],
  selector: 'app-cibil-report-list',
  templateUrl: './cibil-report-list.component.html',
  styleUrls: ['./cibil-report-list.component.css']
})
export class CibilReportListComponent implements OnInit {

  constructor(private router: Router,private cibilService:CibilService) {this._cibilModel=new Cibil }
  CibilCheckerList;

  ngOnInit(): void {
     this.routerUrl = this.router.url;
     this.GetCibilRequesterList();
  }
  routerUrl: any;
  _cibilModel:Cibil;
  openCibilReportModel() {
    let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    cibilReportModel.style.display="flex";
  }

  closeModel() {
    let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    cibilReportModel.removeAttribute('style');
  }

  ShowCibilReport(Id,IsSuccess){
    if(IsSuccess==true)
    {
      this.openCibilReportModel();
      this.cibilService.PassCibilReport(Id);
    }
  }
  GetCibilRequesterList(){
    this.cibilService.GetCibilCheckerList().subscribe(
      response => {

        this.CibilCheckerList=response;
      })
  }


}
