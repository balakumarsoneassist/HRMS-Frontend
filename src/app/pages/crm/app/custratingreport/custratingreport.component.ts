import { Component, OnInit } from '@angular/core';
import { CatReportService } from '../services/custcategory/catreportservice';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, SearchpipePipe],
  selector: 'app-custratingreport',
  templateUrl: './custratingreport.component.html',
  styleUrls: ['./custratingreport.component.css']
})
export class CustratingreportComponent implements OnInit {
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
    this._objRepService.getCategoryReport().subscribe(
      response => {
        this.CategoryList = response

        console.log(response)
        console.log('cat report')

      },
      error => alert('InternalServer Error')
    )
  }

  callStatus(ctype) {

    // let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    // leadFormModel.style.display = "flex";
    localStorage.setItem('segname', ctype);

    //  this._objRepService.SendStatusCode(ctype);
    //  this._objRepService.statusOpeningAcco();
     this.router.navigate(['home/custratingdet']);

    //  localStorage.setItem('statuscode', scode);
    //  localStorage.setItem('statustype', stype);
     //console.log('venkat');
    //  if ((scode < 11) || (scode == 22))
    //  {
    //    console.log('call contact');
    //    this.router.navigate(['home/ncfallreport']);
    //  }
    //  else {
    //    console.log('call lead');
    //    this.router.navigate(['home/nlfallreport']);
    //  }

  }

}
