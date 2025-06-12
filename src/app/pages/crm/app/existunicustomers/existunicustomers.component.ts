import { Component, OnInit } from '@angular/core';
import { CatReportService } from '../services/custcategory/catreportservice';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";
import { ExistloanwisecustomersComponent } from "../existloanwisecustomers/existloanwisecustomers.component";


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, SearchpipePipe, ExistloanwisecustomersComponent],
  selector: 'app-existunicustomers',
  templateUrl: './existunicustomers.component.html',
  styleUrls: ['./existunicustomers.component.css']
})
export class ExistunicustomersComponent implements OnInit {

  CategoryList: any;

  searchStr:string;

  constructor(private _objRepService:CatReportService,private router: Router) {
    this.searchStr = "";
  }

  statusFilter: any
  ngOnInit(): void {
    localStorage.setItem('categorytype',"");

    this.GetCategoryList();
  }
  GetCategoryList() {
    this._objRepService.getUniCReport().subscribe(
      response => {
        this.CategoryList = response

        console.log(response)
        console.log('cat report')

      },
      error => alert('InternalServer Error')
    )
  }

  callStatus(ptype) {

     let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
     leadFormModel.style.display = "flex";
   // localStorage.setItem('segname', ctype);

      this._objRepService.SendProductCode(ptype);
      this._objRepService.statusOpeningAcco();
     //this.router.navigate(['home/custratingdet']);



  }

  closeModel() {
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.removeAttribute('style');
  }



}
