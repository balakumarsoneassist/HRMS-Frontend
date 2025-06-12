import { Component, OnInit } from '@angular/core';
import { SalesVisitService } from '../services/salesvisit/salesvisit.service';
import { MagarepModel } from '../model/report/dailyreport';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchpipePipe } from "../pipe/searchpipe.pipe";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, SearchpipePipe],
    selector: 'app-svcustomer-mycustomer',
    templateUrl: './svcustomer-mycustomer.component.html',
    styleUrls: ['./svcustomer-mycustomer.component.css']
})
export class SvcustomerMycustomerComponent implements OnInit {
    CustList: any;

    searchStr: string;
    FollowerName: any = "";
    empid!: number;
    resInpModel: MagarepModel = {} as MagarepModel;
    constructor(private objSalesService: SalesVisitService) {
        this.searchStr = ""
    }

    ngOnInit(): void {

        this.empid = Number(localStorage.getItem('empid1'))
        this.FollowerName = localStorage.getItem('followerName1');
        //console.log(this.FollowerName);
        if (this.FollowerName == null) { this.FollowerName = "Me" }
        if (this.empid > 0) {
            localStorage.removeItem('empid1');
            localStorage.removeItem('followerName1')
            this.GetEmpCustList(this.empid);
        }
        else {
            this.GetCustomerList();
        }
    }

    GetCustomerList() {
        this.resInpModel.Empid = 0;
        this.objSalesService.GetSVmycustlist(this.resInpModel).subscribe(
            response => {
                // console.log(response)
                this.CustList = response


                // console.log('Customer list')

            },
            error => alert('InternalServer Error')
        )
    }

    GetEmpCustList(eid) {

        this.resInpModel.Empid = eid;
        // console.log(this.resInpModel)
        this.objSalesService.GetSVmycustlist(this.resInpModel).subscribe(
            response => {
                //   console.log('----yes----')
                //  console.log(response);
                this.CustList = response
                //console.log('end')
            },
            error => alert('InternalServer Error')
        )
    }
}
