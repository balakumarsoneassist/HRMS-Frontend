import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeComponent } from 'angularx-qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-qrcodedownload',
  standalone: true,
  imports: [QRCodeComponent],
  templateUrl: './qrcodedownload.component.html',
  styleUrls: ['./qrcodedownload.component.css']
})
export class QrcodedownloadComponent implements OnInit {
  public myAngularxQrCode: string = 'http://oneassist.net.in';
  public qrCodeDownloadLink: SafeUrl = '';
  public forDownload: boolean = true;

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onChangeURL(url: SafeUrl): void {
    this.qrCodeDownloadLink = url;
  }

  showQrCode(): void {
    this.forDownload = false;
  }

  exportAsPDF(): void {
    const data = document.getElementById('table');
    if (data) {
      html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'cm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 21.0, 29.7);
        pdf.save('qrcode.pdf');
      });
    }
  }
}
