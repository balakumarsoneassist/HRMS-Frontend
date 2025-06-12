import { Component, OnInit } from '@angular/core';
import { adminService } from '../services/admin/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConnectorFormModelComponent } from "../connector-form-model/connector-form-model.component";
@Component({
     standalone: true,
      imports: [CommonModule, FormsModule, ConnectorFormModelComponent],
  selector: 'app-adminreport',
  templateUrl: './adminreport.component.html',
  styleUrls: ['./adminreport.component.css']
})
export class AdminreportComponent implements OnInit {
  ReportList: any;
  constructor(private objAdminService:adminService ) { }

  ngOnInit(): void {
    this.GetConnectorList();
  }
  GetConnectorList() {
    this.objAdminService.getAdminReportList().subscribe(
      response => {
        this.ReportList = response

      },
      error => alert('InternalServer Error')
    )
  }





}
