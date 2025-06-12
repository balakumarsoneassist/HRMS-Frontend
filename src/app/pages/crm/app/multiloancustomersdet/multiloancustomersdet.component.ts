import { Component, OnInit } from '@angular/core';
import { CatReportService } from '../services/custcategory/catreportservice';
import { MLModel } from '../model/report/dailyreport';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports:[CommonModule,FormsModule],
  selector: 'app-multiloancustomersdet',
  templateUrl: './multiloancustomersdet.component.html',
  styleUrls: ['./multiloancustomersdet.component.css']
})
export class MultiloancustomersdetComponent implements OnInit {

  PWCList:any;
  spname:any;
  loanModel:MLModel = new MLModel();

  constructor(private service: CatReportService) { }

  ngOnInit(): void {
    this.service.MLCSendObservable.subscribe(response=>{
     // console.log("result -- " +response);
     // alert("result -- " +response)
      this.GetMLCcust(response);
    })
  }
  GetMLCcust(pcode:string)
  {
   // alert(pcode)

    this.spname = pcode.split("--");
  this.loanModel.name = this.spname[0];
  this.loanModel.mobile = this.spname[1];
  //alert(this.loanModel.name);
  //alert(this.loanModel.mobile);

  this.service.getMLDetailReport(this.loanModel).subscribe(
    response => {
        console.log(response);
        this.PWCList=response;


    },
    error => alert('Internal Server Error')
  )
  }


}
