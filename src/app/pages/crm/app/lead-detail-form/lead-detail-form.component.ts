import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';

import { LeadService } from '../services/lead/lead.service';
import { ContactService } from '../services/contact/contact.service';
import { BankService } from '../services/bank/bank.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { LocationServiceService } from '../services/location/location-service.service';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-lead-detail-form',
  templateUrl: './lead-detail-form.component.html',
  styleUrls: ['./lead-detail-form.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    AccordionModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    AvatarModule,
    BadgeModule,
    FormsModule,
    FloatLabelModule
  ]
})
export class LeadDetailFormComponent implements OnInit {
  @Input() isSaveAndClose = false;
  form: FormGroup;
  BankList: any[] = [];
  LocationList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private contactService: ContactService,
    private bankService: BankService,
    private leadTrackService: LeadtrackService,
    private locationService: LocationServiceService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      personal: this.fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        MobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        Email: ['', [Validators.required, Validators.email]],
        LocationId: [null, Validators.required],
        DateOfBirth: [null],
        PanNumber: [''],
        AadharNumber: [''],
        PresentAddress: [''],
        PermanentAddress: [''],
        Gender: [''],
        MaterialStatus: [''],
        NoOfDependent: [''],
        EducationalQualification: ['']
      }),
     occupation: this.fb.array([this.createOccupation()]),     // <-- push one default
    bankDetails: this.fb.array([this.createBank()]),          // <-- push one default
    loanHistory: this.fb.array([this.createLoan()])
    });
  }

  ngOnInit(): void {
    this.loadLocations();
    this.contactService.leadSendObservable.subscribe(id => this.loadLeadDetails(id));
    this.loadBanks();

 // ADD this to show at least one default row:
  if (this.occupation.length === 0) {
    this.addOccupation();
  }
  if (this.bankDetails.length === 0) {
    this.addBank();
  }
  if (this.loanHistory.length === 0) {
    this.addLoan();
  }
  }

  /** Getters for form groups and arrays **/
  get personal(): FormGroup {
    return this.form.get('personal') as FormGroup;
  }
  get occupation(): FormArray {
    return this.form.get('occupation') as FormArray;
  }
  get bankDetails(): FormArray {
    return this.form.get('bankDetails') as FormArray;
  }
  get loanHistory(): FormArray {
    return this.form.get('loanHistory') as FormArray;
  }

  loadLeadDetails(id: number): void {
    this.leadService.GetLeadPersonalDetails(id).subscribe({
      next: data => {
        if(data){
            const model = data[0];
        this.personal.patchValue(model);
        this.resetArray(this.occupation);
        model.OccupationDetails.forEach((o: any) => this.occupation.push(this.createOccupation(o)));
        this.resetArray(this.bankDetails);
        model.BankDetails.forEach((b: any) => this.bankDetails.push(this.createBank(b)));
        this.resetArray(this.loanHistory);
        model.LoanHistory.forEach((l: any) => this.loanHistory.push(this.createLoan(l)));
        }
      },
      error: () => this.messageService.add({severity:'error', summary:'Error', detail:'Load failed'})
    });
  }

  loadBanks(): void {
    this.bankService.GetBankList().subscribe({ next: banks => this.BankList = banks });
  }
  loadLocations(): void {
    this.locationService.GetLocationList().subscribe({ next: locs => this.LocationList = locs });
  }

  createOccupation(o: any = {}): FormGroup {
    return this.fb.group({
      Occupation: [o.Occupation || ''],
      CompanyName: [o.CompanyName || ''],
      CompanyAddress: [o.CompanyAddress || ''],
      Designation: [o.Designation || ''],
      JoiningDate: [o.JoiningDate || null],
      OfficeTelephoneNumber: [o.OfficeTelephoneNumber || ''],
      CompanyGSTINNumber: [o.CompanyGSTINNumber || ''],
      IncomeAmount: [o.IncomeAmount || ''],
      OtherIncomeAmount: [o.OtherIncomeAmount || '']
    });
  }

  createBank(b: any = {}): FormGroup {
    return this.fb.group({
      BankName: [b.BankName || ''],
      Branch: [b.Branch || ''],
      IfscCode: [b.IfscCode || ''],
      AccountNumber: [b.AccountNumber || '']
    });
  }

  createLoan(l: any = {}): FormGroup {
    return this.fb.group({
      LoanType: [l.LoanType || ''],
      LoanAmount: [l.LoanAmount || ''],
      ROI: [l.ROI || ''],
      Tenure: [l.Tenure || ''],
      SanctionDate: [l.SanctionDate || null]
    });
  }

  private resetArray(arr: FormArray): void {
    while (arr.length) arr.removeAt(0);
  }

  addOccupation(): void { this.occupation.push(this.createOccupation()); }
  deleteOccupation(i: number): void { this.occupation.removeAt(i); }
  addBank(): void { this.bankDetails.push(this.createBank()); }
  deleteBank(i: number): void { this.bankDetails.removeAt(i); }
  addLoan(): void { this.loanHistory.push(this.createLoan()); }
  deleteLoan(i: number): void { this.loanHistory.removeAt(i); }

  saveDetails(isClose: boolean): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = {
      ...this.personal.value,
      OccupationDetails: this.occupation.value,
      BankDetails: this.bankDetails.value,
      LoanHistory: this.loanHistory.value
    };
    this.leadService.saveLeadPersonalDetails(payload).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Saved', detail:'Details saved'});
        this.leadTrackService.LeadListRefresh();
        if (isClose) this.closeModel();
      },
      error: () => this.messageService.add({severity:'error', summary:'Error', detail:'Save failed'})
    });
  }

  closeModel(): void {
    // implement close logic or emit event
  }
}
