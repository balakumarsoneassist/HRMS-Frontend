import { Component, OnInit } from '@angular/core';
import { CatReportService } from '../services/custcategory/catreportservice';
import { PWCModel } from '../model/report/dailyreport';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'app-existloanwisecustomers',
    templateUrl: './existloanwisecustomers.component.html',
    styleUrls: ['./existloanwisecustomers.component.css']
})
export class ExistloanwisecustomersComponent implements OnInit {
    PWCList: any;
    prodModel: PWCModel = new PWCModel();

    constructor(private service: CatReportService) { }

    ngOnInit(): void {
        this.service.prodSendObservable.subscribe(response => {
            //  console.log("result -- " +response);
            //alert("result -- " +response)
            this.GetPWcust(response);
        })
    }
    GetPWcust(pcode: string) {
        //alert(pcode)
        this.prodModel.product = pcode;
        this.service.getLoanwiseDetailReport(this.prodModel).subscribe(
            response => {
                console.log(response);
                this.PWCList = response;
            },
            error => alert('Internal Server Error')
        )
    }


}
