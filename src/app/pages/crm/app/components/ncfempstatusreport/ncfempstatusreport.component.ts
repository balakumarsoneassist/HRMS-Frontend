
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report/reportservice';
import { MagarepModel } from '../../model/report/dailyreport';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { SearchpipePipe } from '../../pipe/searchpipe.pipe';
import { CallTrackHistoryComponent } from '../../call-track-history/call-track-history.component';
import { LeadFormModelComponent } from '../../lead-form-model/lead-form-model.component';
import { ContactService } from '../../services/contact/contact.service';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-ncfempstatusreport',
  standalone: true,
  templateUrl: './ncfempstatusreport.component.html',
  styleUrls: ['./ncfempstatusreport.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    SearchpipePipe,
    CallTrackHistoryComponent,
    LeadFormModelComponent
  ]
})
export class NcfempstatusreportComponent implements OnInit {
  StatusList: any;
  StatusType = '';
  FollowerName = '';
  scode!: number;
  empid!: number;
  searchStr = '';

  resInpModel: MagarepModel = {} as MagarepModel;

  showViewDialog = false;
  showTrackDialog = false;
  currentTrackNumber!: number;
  currentLeadId!: number;

  constructor(
    private reportService: ReportService,
    private router: Router,
    private contactService: ContactService,
    private messageService: MessageService,
    private contactSevice : ContactService
  ) {}

  ngOnInit(): void {
    this.scode = Number(localStorage.getItem('statuscode'));
    this.empid = Number(localStorage.getItem('empid'));
    this.StatusType = localStorage.getItem('statustype') || '';
    this.FollowerName = localStorage.getItem('followerName') || '';
    this.GetCFEmpList(this.scode, this.empid);
  }

  GetCFEmpList(code: number, eid: number) {
    this.resInpModel.statuscode = code;
    this.resInpModel.Empid = eid;

    this.reportService.getempfollowStatusReport(this.resInpModel).subscribe({
      next: (response) => {
        this.StatusList = response;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Internal Server Error'
        });
      }
    });
  }

  openView(trackNumber: any) {
    this.currentTrackNumber = trackNumber;
    this.showViewDialog = true;
      this.contactSevice.SendLeadTrack(trackNumber);
  }
  openTrack(trackNumber: any, leadId: any) {
    this.currentLeadId = leadId;
    this.currentTrackNumber = trackNumber;
    console.log(leadId + "------" + trackNumber);

    this.contactService.SendLeadId(leadId);
    this.contactService.SendLeadTrack(trackNumber);
    this.showTrackDialog = true;
  }

  closeDialogs() {
    this.showViewDialog = false;
    this.showTrackDialog = false;
  }
}
