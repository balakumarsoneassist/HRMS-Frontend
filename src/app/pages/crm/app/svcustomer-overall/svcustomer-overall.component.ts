import { Component, OnInit } from '@angular/core';
import { SalesVisitService } from '../services/salesvisit/salesvisit.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, SearchpipePipe],
  selector: 'app-svcustomer-overall',
  templateUrl: './svcustomer-overall.component.html',
  styleUrls: ['./svcustomer-overall.component.css']
})
export class SvcustomerOverallComponent implements OnInit {
  CustList: any;

  searchStr:string;
  constructor(private objSalesService:SalesVisitService, private router:Router) {
    this.searchStr = ""
  }

  ngOnInit(): void {
    this.GetCustomerList();
  }

  GetCustomerList() {
    this.objSalesService.GetSVoveralllist().subscribe(
      response => {
        this.CustList = response

        console.log(response)
       // console.log('Customer list')

      },
      error => alert('InternalServer Error')
    )
  }

 // OpenEmpTrack(Id:any){}

  OpenEmpTrack(Id:any,Ename:any) {//,TrackNumber

    localStorage.setItem('empid1', Id);
    localStorage.setItem('followerName1',Ename)
    //console.log('venkat');

      //console.log('yes');
      //this.router.navigate(['home/ncfempreport']);

      this.router.navigate(['home/svcmycust']);


  }

}
