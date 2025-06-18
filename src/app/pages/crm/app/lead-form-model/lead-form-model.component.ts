import { Component, OnInit } from '@angular/core';
import { LeadModel } from '../model/lead/lead-model';
import { LeadFollowUpFormComponent } from '../lead-follow-up-form/lead-follow-up-form.component';
import { LeadDetailFormComponent } from '../lead-detail-form/lead-detail-form.component';
import { CallTrackHistoryComponent } from '../call-track-history/call-track-history.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';

@Component({
  standalone: true,
  selector: 'app-lead-form-model',
  templateUrl: './lead-form-model.component.html',
  styleUrls: ['./lead-form-model.component.css'],
  imports: [
    LeadFollowUpFormComponent,
    LeadDetailFormComponent,
    CallTrackHistoryComponent,
    FormsModule,
    CommonModule,
    TabsModule
  ]
})
export class LeadFormModelComponent implements OnInit {
  model: LeadModel = new LeadModel();
  activeTabIndex: number = 0;

  constructor() {}

  ngOnInit(): void {}

  closeModel(): void {
    const leadFormModel = document.querySelector('.leadInputModel') as HTMLElement;
    if (leadFormModel) {
      leadFormModel.removeAttribute('style');
    }
  }
}
