import { Component, OnInit } from '@angular/core';
import { connecterService } from '../services/connector/connecterService';
import { ActivatedRoute } from '@angular/router';
import { ConnectorModel } from '../model/Connector/ConnectorModel';
import { BankService } from '../services/bank/bank.service';
import { BranchServiceService } from '../services/branch/branch-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-add-connector-form',
  templateUrl: './add-connector-form.component.html',
  styleUrls: ['./add-connector-form.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CheckboxModule,
    FloatLabelModule
  ]
})
export class AddConnectorFormComponent implements OnInit {
  connectorForm: FormGroup;
  BankList: any[] = [];
  BranchList: any[] = [];

  constructor(
    private connectorService: connecterService,
    private bankService: BankService,
    private branchService: BranchServiceService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.connectorForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      EmailId: ['', [Validators.required, Validators.email]],
      BankId: [null, Validators.required],
      AccountNumber: ['', Validators.required],
      IFSCCode: ['', Validators.required],
      PayoutPercentage: ['', Validators.required],
      BranchId: [null, Validators.required],
      IsActive: [false]
    });
  }

  ngOnInit(): void {
    this.loadBanks();
    this.loadBranches();
  }

  loadBanks() {
    this.bankService.GetBankList().subscribe({
      next: (res) => (this.BankList = res),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load banks'
        })
    });
  }

  loadBranches() {
    this.branchService.GetBranchList().subscribe({
      next: (res) => (this.BranchList = res),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load branches'
        })
    });
  }

  SaveConnectorDetail() {
    if (this.connectorForm.invalid) {
      this.connectorForm.markAllAsTouched();
      return;
    }

    const payload: ConnectorModel = this.connectorForm.value;

    this.connectorService.saveConnectorDetail(payload).subscribe({
      next: (res) => {
        if (res === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'Connector saved successfully'
          });
          this.connectorForm.reset();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Duplicate',
            detail: 'Connector already exists'
          });
        }
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not save connector'
        })
    });
  }
}
