import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { UserDetailsService } from '../services/user-details.service';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-membership-receipt',
  standalone: true,
  imports: [ButtonModule,RouterModule,CommonModule, CardModule],
  template: `<div *ngIf="membershipStatus" class="receipt-container">
  <div class="header">
    <img src="assets/logo.jpg" alt="Logo" class="logo" />
    <div class="title">
      <h2>VILLAGE MISSIONARY MOVEMENT</h2>
      <p class="subtitle">Membership Fee Receipt</p>
    </div>
    <img src="assets/qrcode.jpg" alt="QR Code" class="qr-code" />
  </div>

  <div class="address-payment-row">
    <div class="address-section">
      <strong>ADDRESS:</strong>
      <p>{{ orgAddress.name }}</p>
      <p>{{ orgAddress.street }}</p>
      <p>{{ orgAddress.phone }}</p>
      <p>{{ orgAddress.email }}</p>
    </div>

    <div class="payment-section">
      <strong>PAYMENT METHOD :</strong>
      <p>Receipt No : {{ payment.receiptNo }}</p>
      <p>Amount : {{ payment.amount }}</p>
      <p>Transaction ID : {{ payment.transactionId }}</p>
      <p>Status : {{ payment.status }}</p>
      <p>Date : {{ payment.date }}</p>
    </div>
  </div>

  <table class="details-table">
    <tr>
      <td>Received From</td>
      <td>{{ user.fullName }}</td>
    </tr>
    <tr>
      <td>Rupees (In Words)</td>
      <td>{{ payment.amountWords }}</td>
    </tr>
    <tr>
      <td>Address</td>
      <td>{{ user.address }}</td>
    </tr>
  </table>

  <div class="footer">
    <p>Thank you for your generous contribution</p>
    <div class="signature-block">
      <img src="assets/signature.jpg" alt="Signature" class="signature" />
      <p>Rajukumar Maurya<br />(President/co-founder)<br />VMM Trust<br />Authorised signatory</p>
    </div>
  </div>
</div>
<div *ngIf="!membershipStatus">
  <h1>Membership status: {{ membershipApply }} for {{ user.fullName }}</h1>

  <div *ngIf="membershipApply === 'Applied'">
    <p>You are on the waiting list. Your membership application has been applied.</p>
  </div>

  <div *ngIf="membershipApply === 'Available'">
    <p>Your membership is available.</p>
    <!-- <button pbutton [routerLink]="'app/generatereciept'">Generate the membership receipt</button> -->
    <p-button label="Generate Membership Receipt" [routerLink]="'/app/generatereciept'"></p-button>
    <button pButton type="button" label="Generate Membership Receipt" [routerLink]="['/app/generatereciept']">
  Generate Membership Receipt
</button>


  </div>

  <div *ngIf="membershipApply === 'NotApplied'">
    <p>You have not applied for membership.</p>
    <!-- <button pbutton [routerLink]="'app/recieptapply'">Click here to apply for membership</button> -->
    <p-button label="Apply for membership" [routerLink]="'/app/recieptapply'"></p-button>
    <button pButton type="button" label="Generate Membership Receipt" [routerLink]="['/app/generatereciept']"></button>


  </div>
</div>
`,
  styles: [`.receipt-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    border: 1px solid #ccc;
    background-color: #fff;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .logo, .qr-code {
      width: 80px;
      height: auto;
    }

    .title {
      text-align: center;

      h2 {
        margin: 0;
        font-size: 24px;
      }

      .subtitle {
        margin: 0;
        font-size: 16px;
        color: #666;
      }
    }
  }

  .address-payment-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .address-section, .payment-section {
      width: 48%;
      background-color: #f9f9f9;
      padding: 10px;
      border-radius: 5px;

      strong {
        display: block;
        margin-bottom: 5px;
      }

      p {
        margin: 2px 0;
        font-size: 14px;
      }
    }
  }

  .details-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    td {
      border: 1px solid #ddd;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  }

  .footer {
    text-align: center;

    .signature-block {
      margin-top: 10px;

      .signature {
        width: 120px;
        height: auto;
      }

      p {
        margin: 5px 0 0 0;
        font-size: 12px;
      }
    }
  }
  `]
})
export class MembershipReceiptComponent {
    user: any;
    orgAddress: any;
    payment: any;

    private userStore = inject(UserDetailsService);
    emailFromQuery: string | null;

    @ViewChild('receipt') receiptRef!: ElementRef;
    membershipStatus : any
    membershipApply:  'Applied' | 'Available' | 'NotApplied' = 'NotApplied';
    constructor(private route: ActivatedRoute,) {
      this.emailFromQuery = this.route.snapshot.queryParamMap.get('email');
    }

    ngOnInit(): void {
      if (this.emailFromQuery) {
        const userData = JSON.parse(this.route.snapshot.queryParamMap.get('email')!);

        this.user = {
          fullName: userData.name,
          address: userData.address
        };
        this.membershipStatus = userData.membershipStatus
        this.membershipApply =  userData.membershipApply
        this.orgAddress = {
          name: 'Your Organization Name', // optionally from userData
          street: '123 Anywhere St., Any City',
          phone: '+123 456 7890',
          email: 'hello@reallygreatsite.com'
        };

        this.payment = {
          receiptNo: userData.receiptNo || 'M/RCP-63',
          amount: userData.amount || 100,
          transactionId: userData.transactionId || 'pay_q8zozhwy',
          status: userData.status || 'Captured',
          date: userData.date || new Date().toLocaleDateString(),
          amountWords: userData.amountWords || 'One Hundred Rupees'
        };
      } else {
        this.userStore.user$.subscribe((userData: any) => {
          if (userData) {
            this.membershipStatus = userData.membershipStatus
        this.membershipApply =  userData.membershipApply
            this.user = {
              fullName: userData.name,
              address: userData.address
            };

            this.orgAddress = {
              name: 'Your Organization Name',
              street: '123 Anywhere St., Any City',
              phone: '+123 456 7890',
              email: 'hello@reallygreatsite.com'
            };

            this.payment = {
              receiptNo: 'M/RCP-63',
              amount: 100,
              transactionId: 'pay_q8zozhwy',
              status: 'Captured',
              date: new Date().toLocaleDateString(),
              amountWords: 'One Hundred Rupees'
            };
          }
        });
      }
    }

    downloadPDF() {
      html2canvas(this.receiptRef.nativeElement).then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save('membership-receipt.pdf');
      });
    }
  }

