
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserDetailsService } from '../services/user-details.service';
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

 private userStore = inject(UserDetailsService);
    userName: any;
    user : any
    emailFromQuery: string | null;
    userData: any;
    ngOnInit(): void {
      if(this.emailFromQuery){
         this.userData = JSON.parse(this.route.snapshot.queryParamMap.get('email')!);
         const userData = JSON.parse(this.route.snapshot.queryParamMap.get('email')!);

        this.user = {
            name: userData.name,
            idNo: userData.registernumber,
            dob: '-',  // no DOB from backend
            blood: userData.donor_category,
            phone: userData.mobilenumber,
            email: userData.email,
            joinDate: userData.registrationdate,
            expireDate: '-',  // no expire date from backend
            profilepic: userData.profilepic
        };
        if (this.barcodeSvgRef && userData.mobilenumber) {
            JsBarcode(this.barcodeSvgRef.nativeElement, userData.mobilenumber, {
              format: 'CODE128',
              width: 2,
              height: 50,
              displayValue: true
            });
          }
      }
      else {
        this.userStore.user$.subscribe((userData: any) => {
            if (userData) {
                this.user = {
                    name: userData.name,
                    idNo: userData.registernumber,
                    dob: '-',  // no DOB from backend
                    blood: userData.donor_category,
                    phone: userData.mobilenumber,
                    email: userData.email,
                    joinDate: userData.registrationdate,
                    expireDate: '-',  // no expire date from backend
                    profilepic: userData.profilepic
                };
            }
            if (this.barcodeSvgRef && userData.mobilenumber) {
                JsBarcode(this.barcodeSvgRef.nativeElement, userData.mobilenumber, {
                  format: 'CODE128',
                  width: 2,
                  height: 50,
                  displayValue: true
                });
              }

        });
      }

    }
    ngAfterViewInit(): void {
         if (this.barcodeSvgRef && this.userData.mobilenumber) {
            JsBarcode(this.barcodeSvgRef.nativeElement, this.userData.mobilenumber, {
              format: 'CODE128',
              width: 2,
              height: 50,
              displayValue: true
            });
          }
      }


  constructor(private route: ActivatedRoute) {
    this.emailFromQuery = this.route.snapshot.queryParamMap.get('email');
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

      // Add second page for the back side
      html2canvas(backElement).then(backCanvas => {
        const backImg = backCanvas.toDataURL('image/png');
        pdf.addPage();
        pdf.addImage(backImg, 'PNG', 10, 10, imgWidth, (backCanvas.height * imgWidth) / backCanvas.width);
        pdf.save('id-card.pdf');
      });
    });
  }

}
