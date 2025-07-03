import { Component, OnInit } from '@angular/core';
import { Qrshops } from '../model/Qrcode/qrplaces';
import { QrcodeService } from '../services/qrcode/qrcode.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-qrcodeplaces',
  standalone: true,
  templateUrl: './qrcodeplaces.component.html',
  styleUrls: ['./qrcodeplaces.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    MessageModule,
    ToastModule,
    DropdownModule,
    InputTextModule,
    ButtonModule
  ]
})
export class QrcodeplacesComponent implements OnInit {
  qrForm!: FormGroup;
  empList: any[] = [];
  stateData: any;

  constructor(
    private qrcodeService: QrcodeService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.qrForm = this.fb.group({
      Name: ['', Validators.required],
      ContactPerson: [''],
      PresentAddress: [''],
      Address1: [''],
      City: [''],
      Pincode: ['', [Validators.maxLength(6)]],
      MobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      UpiMobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      EmailId: ['', [Validators.email]],
      Referer: ['']
    });

    this.loadEmpList();

    this.qrcodeService.ShopSubjectObservable.subscribe(response => {
      this.loadShopById(response);
    });

    this.stateData = history.state.data;
    if (this.stateData) {
      this.qrForm.patchValue(this.stateData);
    }
  }

  loadEmpList() {
    this.qrcodeService.GetEmployeeNameList().subscribe({
      next: res => {
        this.empList = res;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load employee list' });
      }
    });
  }

  loadShopById(shopId: string) {
    this.qrcodeService.GetShopById(shopId).subscribe({
      next: res => {
        if (res && res[0]) {
          this.qrForm.patchValue(res[0]);
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load shop' });
      }
    });
  }

  onSubmit() {
    if (this.qrForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Validation', detail: 'Please fill all required fields' });
      return;
    }
    const payload: Qrshops = this.qrForm.value;
    this.qrcodeService.SaveQrplaceDetails(payload).subscribe({
      next: res => {
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${payload.Name} saved successfully.` });
          this.qrcodeService.ShopsListRefresh();
          this.qrForm.reset();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Save failed' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server error' });
      }
    });
  }
}
