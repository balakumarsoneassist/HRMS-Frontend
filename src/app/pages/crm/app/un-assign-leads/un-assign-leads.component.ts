import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead/lead.service';
import { LeadModel } from '../model/lead/lead-model';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { ContactService } from '../services/contact/contact.service';
import { IciciService } from '../services/Icici/icici.service';
import { PaginationModel } from '../model/Contact/ContactModel';
import { BajajService } from '../services/bajaj/bajaj.service';
import { LoaderService } from '../services/loader/loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-un-assign-leads',
  standalone: true,
  templateUrl: './un-assign-leads.component.html',
  styleUrls: ['./un-assign-leads.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    FloatLabelModule
  ],
})
export class UnAssignLeadsComponent implements OnInit {
  form: FormGroup;
  model: LeadModel = new LeadModel();
  ManualPageInput: any;
  PageNumber: number = 0;
  TotalNumberOfPages: number = 1;
  TotalRecordNo: number = 0;
  IsbtnPreviousEnable: boolean = true;
  IsbtnNextEnable: boolean = true;
  StartNo!: number;
  EndNo!: number;
  _objPageModel: PaginationModel = new PaginationModel();
  loadSpin: number = 0;

  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private leadTrackService: LeadtrackService,
    private iciciService: IciciService,
    private bajajService: BajajService,
    public loaderService: LoaderService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      SearchText: [''],
    });
  }

  ngOnInit(): void {
    this.getUnassignedLeadList();
  }

  getUnassignedLeadList() {
    this._objPageModel.PageNumber = this.PageNumber;
    this._objPageModel.SearchText = this.form.get('SearchText')?.value;
    console.log(this._objPageModel.SearchText);

    this.loadSpin = 1;
    this.leadService.getUnassignLeadList(this._objPageModel).subscribe({
      next: (response) => {
        this.model.UnassignedLeadList = response;
        if (response.length === 0) {
          this.PageNumber = 0;
          this.TotalRecordNo = 0;
          this.TotalNumberOfPages = 0;
          this.StartNo = 0;
          this.EndNo = 0;
          this.loadSpin = 0;
          return;
        }
        this.TotalRecordNo = response[0].TotalRows;
        this.ManualPageInput = this.PageNumber + 1;
        this.PageFooterCalculation();
        this.EnablePageButton();
        this.loadSpin = 0;
      },
      error: () => {
        this.loadSpin = 0;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error retrieving unassigned lead list',
        });
      },
    });
  }

  AssignEmployee(Id: any, TrackNumber: any) {
    const _objLeadFollowUp = {
      LeadId: Id,
      TrackId: TrackNumber,
    };

    this.loadSpin = 1;
    this.leadTrackService.AssignEmployeeToLead(_objLeadFollowUp).subscribe({
      next: (response) => {
        this.loadSpin = 0;
        if (response === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Assigned',
            detail: 'Lead assigned successfully',
          });
          this.getUnassignedLeadList();
        }
      },
      error: () => {
        this.loadSpin = 0;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Internal server error',
        });
      },
    });
  }

  lazyLoad(event: any) {
    this.PageNumber = event.first / event.rows;
    this.getUnassignedLeadList();
  }

  EnablePageButton() {
    this.IsbtnPreviousEnable = this.PageNumber > 0;
    this.IsbtnNextEnable =
      this.PageNumber + 1 < this.TotalNumberOfPages || this.PageNumber == 0;
  }

  PageFooterCalculation() {
    this.StartNo = this.PageNumber * 10 + 1;
    this.EndNo = this.PageNumber * 10 + 10;
    let name: any = this.model;
    this.TotalNumberOfPages = Math.floor(name.UnassignedLeadList[0].TotalRows / 10);
    if (name.UnassignedLeadList[0].TotalRows % 10 > 0) {
      this.TotalNumberOfPages = this.TotalNumberOfPages + 1;
    }
  }

  openCibilReportModel(Id: any) {
    const cibilReportModel = document.querySelector(
      '.cibilReportModel'
    ) as HTMLElement;
    if (cibilReportModel) {
      cibilReportModel.style.display = 'flex';
    }
    this.iciciService.SendIciciId(Id);
  }

  openCibilReportModel1(Id: any) {
    const cibilReportModel = document.querySelector(
      '.cibilReportModel1'
    ) as HTMLElement;
    if (cibilReportModel) {
      cibilReportModel.style.display = 'flex';
    }
    this.bajajService.SendBajajId(Id);
  }

  closeModel() {
    const cibilReportModel = document.querySelector(
      '.cibilReportModel'
    ) as HTMLElement;
    if (cibilReportModel) {
      cibilReportModel.style.removeProperty('style');
    }
  }

  closeModel1() {
    const cibilReportModel = document.querySelector(
      '.cibilReportModel1'
    ) as HTMLElement;
    if (cibilReportModel) {
      cibilReportModel.style.removeProperty('style');
    }
  }
}
