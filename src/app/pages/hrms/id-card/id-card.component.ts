import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-id-card',
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './id-card.component.html',
  styleUrl: './id-card.component.scss'
})
export class IdCardComponent implements OnInit {
  @ViewChild('certificate') certificateRef!: ElementRef;
  @ViewChild('certificateBack') certificateBackRef!: ElementRef;
  @ViewChild('barcodeSvg', { static: false }) barcodeSvgRef!: ElementRef<SVGElement>;

  user: any;
  emailFromQuery: string | null;
  userData: any;

  constructor(private route: ActivatedRoute) {
    this.emailFromQuery = this.route.snapshot.queryParamMap.get('email');
  }

  ngOnInit(): void {
    // ✅ Hardcoded user data
    this.user = {
      name: 'Balakumar Sivasubramanian',
      idNo: 'VMM2025001',
      dob: '1991-07-16',
      blood: 'B+',
      phone: '9876543210',
      email: 'bala@vmm.org',
      joinDate: '2025-01-10',
      expireDate: '2030-01-10',
      profilepic: 'assets/images/sample-profile.jpg'
    };

    // Generate barcode
    if (this.barcodeSvgRef) {
      JsBarcode(this.barcodeSvgRef.nativeElement, this.user.phone, {
        format: 'CODE128',
        width: 2,
        height: 50,
        displayValue: true
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.barcodeSvgRef && this.user?.phone) {
      JsBarcode(this.barcodeSvgRef.nativeElement, this.user.phone, {
        format: 'CODE128',
        width: 2,
        height: 50,
        displayValue: true
      });
    }
  }

  downloadPDF() {
    const frontElement = this.certificateRef.nativeElement;
    const backElement = this.certificateBackRef.nativeElement;
    const pdf = new jsPDF();

    html2canvas(frontElement).then(frontCanvas => {
      const frontImg = frontCanvas.toDataURL('image/png');
      const imgWidth = 190;
      const imgHeight = (frontCanvas.height * imgWidth) / frontCanvas.width;
      pdf.addImage(frontImg, 'PNG', 10, 10, imgWidth, imgHeight);

      html2canvas(backElement).then(backCanvas => {
        const backImg = backCanvas.toDataURL('image/png');
        pdf.addPage();
        pdf.addImage(backImg, 'PNG', 10, 10, imgWidth, (backCanvas.height * imgWidth) / backCanvas.width);
        pdf.save('id-card.pdf');
      });
    });
  }
}
