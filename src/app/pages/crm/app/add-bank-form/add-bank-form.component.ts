import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank/bank.service';
import { Bank } from '../model/bank/bank';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BankNameListComponent } from '../bank-name-list/bank-name-list.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-add-bank-form',
  templateUrl: './add-bank-form.component.html',
  styleUrls: ['./add-bank-form.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BankNameListComponent,
    ToastModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule
  ]
})
export class AddBankFormComponent implements OnInit {
  bankForm: FormGroup;
  BankId: any;

  constructor(
    private bankService: BankService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.bankForm = this.fb.group({
      BankName: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]{1,32}$/)]]
    });
  }

  ngOnInit(): void {
    // listen from bank edit
    this.bankService.bankObservable.subscribe((response) => {
        console.log(response);

      if (response && response.bankdetail) {
        this.bankForm.patchValue(response.bankdetail);
      }


    // check route param
    this.BankId = response.bankdetail.Id;
    if (this.BankId) {
      this.GetBankById(this.BankId);
    }
    });
  }

  SaveBankDetails() {
    if (this.bankForm.invalid) {
      this.bankForm.markAllAsTouched();
      return;
    }
    let payload: any = this.bankForm.value;
    if(this.BankId){
        payload.Id = this.BankId
    }


    this.bankService.SaveBankDetails(payload).subscribe({
      next: (res) => {
        if (res === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'Bank saved successfully'
          });
          this.bankForm.reset();
          this.bankService.bankListRefresh();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Duplicate',
            detail: 'Bank name already exists'
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cannot save bank'
        });
      }
    });
  }

  GetBankById(BankId: number) {
    this.bankService.GetBankById(BankId).subscribe({
      next: (res) => {
        if (res && res[0]) {
          this.bankForm.patchValue(res[0]);
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load bank'
        });
      }
    });
  }
}
