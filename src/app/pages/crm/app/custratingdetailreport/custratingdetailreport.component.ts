import { Component, OnInit } from '@angular/core';
import { CatReportService } from '../services/custcategory/catreportservice';
import { SegmentModel } from '../model/report/dailyreport';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact/contact.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";
import { CallTrackHistoryComponent } from "../call-track-history/call-track-history.component";

@Component({
  standalone: true,
  selector: 'app-custratingdetailreport',
  templateUrl: './custratingdetailreport.component.html',
  styleUrls: ['./custratingdetailreport.component.css'],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    LeadFormModelComponent,
    FormsModule,
    ReactiveFormsModule,
    CallTrackHistoryComponent
  ],
  providers: [MessageService]
})
export class CustratingdetailreportComponent implements OnInit {
  statusList: any[] = [];
  searchForm!: FormGroup;
  resInpModel: SegmentModel = {} as SegmentModel;
  custsegtype: string | null = '';
  displayLeadForm = false;
  displayTrackHistory = false;

  constructor(
    private catReportService: CatReportService,
    private router: Router,
    private contactService: ContactService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchStr: ['']
    });

    this.custsegtype = localStorage.getItem('segname');
    this.getSegmentwiseList(this.custsegtype ?? '');
  }

  get searchStr() : FormControl{
    return this.searchForm.get('searchStr') as FormControl;
  }

  getSegmentwiseList(stype: string) {
    this.resInpModel.segment = stype;
    this.catReportService.getSegmentwiseDetailReport(this.resInpModel).subscribe({
      next: (res) => {
        this.statusList = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load segment data'
        });
      }
    });
  }

  callStatus(trackId: string, id: number) {
    this.contactService.SendLeadId(id);
    this.contactService.SendLeadTrack(trackId);
    this.displayLeadForm = true;
  }

  openTrackHistory(trackNumber: string) {
    this.contactService.SendLeadTrack(trackNumber);
    this.displayTrackHistory = true;
  }
}
