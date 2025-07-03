import { Component, OnInit } from '@angular/core';
import { QrCodeGen1 } from '../model/Qrcode/qrgen';
import { QrcodeService } from '../services/qrcode/qrcode.service';
import { PaginationModel } from '../model/Contact/ContactModel';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-qrcodegenerate',
  standalone: true,
  templateUrl: './qrcodegenerate.component.html',
  styleUrls: ['./qrcodegenerate.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    MessageModule
  ]
})
export class QrcodegenerateComponent implements OnInit {
  qrForm!: FormGroup;
  custList: any[] = [];

  constructor(
    private qrService: QrcodeService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.qrForm = this.fb.group({
      CustomerId: [null, Validators.required],
      OfferCode: [''],
      ValidFrom: [null],
      ValidTo: [null],
      QRcodefile: ['', Validators.required],
      QrToken: [this.randomString(15)]
    });

    this.loadCustList();
  }

  onSubmit() {
    if (this.qrForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation',
        detail: 'Please fill the required fields'
      });
      return;
    }
    const payload: QrCodeGen1 = this.qrForm.value;
    this.qrService.SaveQrTokenDetails(payload).subscribe({
      next: res => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'QR Code Generated Successfully'
          });
          this.qrForm.reset();
          this.qrForm.patchValue({ QrToken: this.randomString(15) });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error saving QR Token'
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Server error'
        });
      }
    });
  }

  loadCustList() {
    this.qrService.GetAllShopsList().subscribe({
      next: res => (this.custList = res),
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load customer list'
        });
      }
    });
  }

  randomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
