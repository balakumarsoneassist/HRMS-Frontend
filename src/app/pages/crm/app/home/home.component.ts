import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { EmployeeService } from '../services/employee/employee.service';
import { ContactService } from '../services/contact/contact.service';
import { OurbankService } from '../services/ourbank/ourbank.service';

import { Employee } from '../model/employee/employee';
import { CardCountModel } from '../model/common/cardcnt';
import { OurBankDiff, OurBankMasterModel } from '../model/ourbank/ourbank';

import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";
import { AddOurbankFormComponent } from "../add-ourbank-form/add-ourbank-form.component";
import { OnreviewComponent } from "../onreview/onreview.component";
import { UnTrackContactComponent } from "../un-track-contact/un-track-contact.component";
import { OnTrackContactComponent } from "../on-track-contact/on-track-contact.component";
import { OnTrackLeadComponent } from "../on-track-lead/on-track-lead.component";
import { UnTrackLeadComponent } from "../un-track-lead/un-track-lead.component";

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';



@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [
        CommonModule,
        DialogModule,
        FormsModule,
        TableModule,
        ToastModule,
        TabsModule,
        MessagesModule,
        AddOurbankFormComponent,
        OnreviewComponent,
        UnTrackContactComponent,
        OnTrackContactComponent,
        OnTrackLeadComponent,
        UnTrackLeadComponent,
        ButtonModule
    ],
    providers: [MessageService]
})
export class HomeComponent implements OnInit {

    objEmployeeModel: Employee = new Employee();
    cardcount: CardCountModel = {} as CardCountModel;
    DayDiffList: OurBankDiff[] = [];
    OurbModel: OurBankMasterModel[] = [];
    leadCardContent: any;
    hideOurBank: boolean = false;
    hideOurbankDetails: boolean = true;
    hideViewBankList: boolean = false;
    hidehBankList: boolean = true;
    value: number = 1; // Controls subpanel switching
    values: number = 3; // Controls subpanel switching

    homeComponents: string = "OnReview";
    date: any;
    notes: any;
    loanType: any;
    desireLoanAmount: any;
    preferedBank: any;
    cibilScore: any;
    incomeCheck: any;
    idProof: any;
    addressProof: any;
    notRespondCardContent: any;
    followUpCardContent: any
    RejectedCardContent: any;
    callsCardContent: any;
    constructor(
        private _objEmplyeeService: EmployeeService,
        private _objcontactService: ContactService,
        private _objOurBankService: OurbankService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.resetCardCounts();
        this.GetUserRights();
        this.getcontactcard()
        this.GetOurbankDiff();
    }

    resetCardCounts() {
        this.cardcount = {
            AttendCallDayCount: 0,
            AttendCallMonthCount: 0,
            PendingCallDayCount: 0,
            PendingCallMonthCount: 0,
            RejectCallDayCount: 0,
            RejectCallMonthCount: 0,
            TotalCallDayCount: 0,
            TotalCallMonthCount: 0,
            TotalLeadDayCount: 0,
            TotalLeadMonthCount: 0
        };
    }

    GetUserRights() {
        this._objEmplyeeService.GetEmployeeRights().subscribe({
            next: (response) => {
                this.objEmployeeModel = response[0];
                this.CheckUserRights();
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Internal Server Error - Employee Rights'
                });
            }
        });
    }

    CheckUserRights() {
        this.hideOurBank = !this.objEmployeeModel.IsAdminRights;
    }

    getcontactcard() {
        this._objcontactService.Getcardcontact().subscribe({
            next: (response) => {
                console.log(response);

                this.cardcount = response[0];
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Internal Server Error - Contact Cards'
                });
            }
        });
    }

    GetOurbankDiff() {
        this._objOurBankService.GetOurBankDiffList().subscribe({
            next: (response) => {
                this.DayDiffList = response;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Internal Server Error - Bank Diff List'
                });
            }
        });
    }

    OpenBankNetworkDetails() {
        console.log("hhh");

        this.hideOurbankDetails = false;
        this.hideViewBankList = true;
        this.hidehBankList = false;
        this.GetOurBankDetails();
    }

    CloseBankNetworkDetails() {
        console.log("hhh");

        this.hideViewBankList = false;
        this.hidehBankList = true;
        this.hideOurbankDetails = true;
    }

    GetOurBankDetails() {
        this._objOurBankService.GetOurBankList().subscribe({
            next: (response) => {
                this.OurbModel = response;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Internal Server Error - Our Bank List'
                });
            }
        });
    }

    closeModel1() {
        const cibilReportModel = document.querySelector('.cibilReportModel1') as HTMLElement;
        cibilReportModel?.removeAttribute('style');
    }

    showOurBankModal: boolean = false;

    AddourBank() {
        this.showOurBankModal = true;
        this._objOurBankService.SendOurBankId(0);
    }

    editOurBank(id: number) {
        this.showOurBankModal = true;
        this._objOurBankService.SendOurBankId(id);
    }


    activeTabIndex = 0;

    onTabChange(event: any) {
        this.activeTabIndex = event.index;
        const map = ['OnReview', 'OnTrackContact', 'OnTrackLead'];
        this.homeComponents = map[event.index] ?? this.homeComponents;
    }

}
