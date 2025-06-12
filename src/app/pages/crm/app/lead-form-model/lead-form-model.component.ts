import { Component, OnInit } from '@angular/core';
import { LeadModel } from '../model/lead/lead-model';
import { LeadFollowUpFormComponent } from "../lead-follow-up-form/lead-follow-up-form.component";
import { LeadDetailFormComponent } from "../lead-detail-form/lead-detail-form.component";
import { CallTrackHistoryComponent } from "../call-track-history/call-track-history.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [LeadFollowUpFormComponent, LeadDetailFormComponent, CallTrackHistoryComponent,FormsModule,CommonModule],
    selector: 'app-lead-form-model',
    templateUrl: './lead-form-model.component.html',
    styleUrls: ['./lead-form-model.component.css'],
})
export class LeadFormModelComponent implements OnInit {

    constructor() {
        this.model = new LeadModel();
    }

    ngOnInit(): void {
    }
    model: LeadModel;

    /* content tab - start */
    contentTab(evt: any, cityName: any) {
        let i: number, tabcontent: any, tablinks: any;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tabBtn");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        let block: any = document.getElementById(cityName)
        block.style.display = "block";
        evt.currentTarget.className += " active";
    }
    /* content tab - end */

    closeModel() {
        let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
        leadFormModel.removeAttribute('style');
    }

}
