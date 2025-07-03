import { Component, OnInit } from '@angular/core';
import { QrcodeService } from '../services/qrcode/qrcode.service';
import { Qrtoken } from '../model/Qrcode/Qrtoken';
import { SafeUrl } from "@angular/platform-browser";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-qrcodedownload',
  standalone: true,
  templateUrl: './qrcodedownload.component.html',
  styleUrls: ['./qrcodedownload.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    QRCodeComponent
  ]
})
export class QrcodedownloadComponent implements OnInit {
  model: Qrtoken = new Qrtoken();
  qrTokenList: any[] = [];

  Offname = '';
  Offercode = '';
  Vfrom = '';
  Vto = '';
  ename = '';
  qrtoken = '';
  qrname = '';

  selectedTokenIndex: any = null;

  forDownload = true;
  myAngularxQrCode = '';
  qrCodeDownloadLink: SafeUrl = '';

  constructor(
    private qrService: QrcodeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getQrtokenList();
  }

  getQrtokenList() {
    this.qrService.GetTokenListAll().subscribe({
      next: response => {
        this.model.QrTokenList = response;
        this.qrTokenList = response;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load QR Token List'
        });
      }
    });
  }

  onOptionsSelected(numbers: any) {
    let value = numbers.value

    if (value !== null) {
      this.Offname = value.Name;
      this.Offercode = value.Offercode || 'N/A';
      this.Vfrom = value.Validfrom;
      this.Vto = value.Vaildto;
      this.ename = value.Responsible;
      this.qrtoken = value.Qrtoken;
      this.qrname = value.Qrtokenname;
      this.myAngularxQrCode = `http://oneassist.net.in/newloan.html?token=${this.qrtoken}`;
    }
  }

  ShowQrCode() {
    if (!this.qrname) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Please select a QR Token before generating QR Code'
      });
      return;
    }
    this.forDownload = false;
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  exportAsPDF() {
    const data = document.getElementById('table');
    if (data) {
      html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'cm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 21, 29.7);
        pdf.save(`${this.qrname || 'qrcode'}.pdf`);
        this.messageService.add({
          severity: 'success',
          summary: 'Download',
          detail: 'PDF downloaded successfully'
        });
      });
    }
  }
}
