import { Component, OnInit } from '@angular/core';
import { CatReportService } from '../services/custcategory/catreportservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";
import { MultiloancustomersdetComponent } from "../multiloancustomersdet/multiloancustomersdet.component";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, SearchpipePipe, MultiloancustomersdetComponent],
  selector: 'app-multiloancustomers',
  templateUrl: './multiloancustomers.component.html',
  styleUrls: ['./multiloancustomers.component.css']
})
export class MultiloancustomersComponent implements OnInit {

  CategoryList: any;
  ptype: any;

  searchStr:string;

  constructor(private _objRepService:CatReportService,private router: Router) {
    this.searchStr = "";
  }

  statusFilter: any
  ngOnInit(): void {
    localStorage.setItem('categorytype',"");

    this.GetMultiLoanList();
  }
  GetMultiLoanList() {
    this._objRepService.getMultiloanReport().subscribe(
      response => {
        this.CategoryList = response

        console.log(response)
     //   console.log('cat report')

      },
      error => alert('InternalServer Error')
    )
  }

  callStatus(cname,mno) {

     let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
     leadFormModel.style.display = "flex";
   // localStorage.setItem('segname', ctype);
      this.ptype = cname + "--"+ mno;
      this._objRepService.SendMLCCode(this.ptype);
      this._objRepService.statusOpeningAcco();
     //this.router.navigate(['home/custratingdet']);



  }

  closeModel() {
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.removeAttribute('style');
  }



}
