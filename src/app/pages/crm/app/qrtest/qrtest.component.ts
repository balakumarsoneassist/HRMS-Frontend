import { Component, OnInit } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-qrtest',
  standalone: true,
  imports: [QRCodeComponent],
  templateUrl: './qrtest.component.html',
  styleUrls: ['./qrtest.component.css']
})
export class QrtestComponent implements OnInit {
  public myAngularxQrCode: string = 'http://oneassist.net.in';
  public qrCodeDownloadLink: SafeUrl = '';

  ngOnInit(): void {}

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  exportAsPDF() {
    const data = document.getElementById('table');
    if (data) {
      html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'cm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 21.0, 29.7);
        pdf.save('Filename.pdf');
      });
    }
  }

  download() {
    const element = document.getElementById('table');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        const imgHeight = (canvas.height * 208) / canvas.width;
        doc.addImage(imgData, 0, 0, 208, imgHeight);
        doc.save('abc.pdf');
      });
    }
  }
}
