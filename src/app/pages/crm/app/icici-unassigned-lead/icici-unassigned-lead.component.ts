import { Component, OnInit } from '@angular/core';
import { LeadModel } from '../model/lead/lead-model';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { LeadService } from '../services/lead/lead.service';
import { IciciService } from '../services/Icici/icici.service';
import { PaginationModel } from '../model/Contact/ContactModel';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddIciciFormComponent } from "../add-icici-form/add-icici-form.component";


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, AddIciciFormComponent],
  selector: 'app-icici-unassigned-lead',
  templateUrl: './icici-unassigned-lead.component.html',
  styleUrls: ['./icici-unassigned-lead.component.css']
})
export class IciciUnassignedLeadComponent implements OnInit {

  model: LeadModel;
  unassignedList:any;
  PageList:PaginationModel
  constructor(private leadService: LeadService,private leadTrackService:LeadtrackService,private iciciService:IciciService) {
     this.model=new LeadModel;
     this.PageList=new PaginationModel;
    }

  ngOnInit(): void {
    this.getUnassignedLeadList();
  }
  getUnassignedLeadList(){
    this.PageList.PageNumber=0;
    this.leadService.getUnassignLeadList(this.PageList).subscribe(
      response => {
          this.unassignedList=response
          this.model.UnassignedLeadList=this.unassignedList;
      },
      error => alert('Cant Save')
    )
  }
  openCibilReportModel(Id) {
    let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    cibilReportModel.style.display="flex";
    this.iciciService.SendIciciId(Id);
  }

  closeModel() {
    let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    cibilReportModel.removeAttribute('style');
  }
}
