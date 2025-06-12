import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsService } from '../services/user-details.service';
@Component({
  selector: 'app-certificate',
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.scss'
})
export class CertificateComponent  {
      userName: any;
        user : any
         private userStore = inject(UserDetailsService);

        emailFromQuery: string | null | undefined;


  constructor(private route: ActivatedRoute) {
    this.emailFromQuery = this.route.snapshot.queryParamMap.get('email');

  }
        ngOnInit(): void {
          if(this.emailFromQuery){
            const userData = JSON.parse(this.route.snapshot.queryParamMap.get('data')!);
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
            this.userName =userData.name
          }
          else {
            this.userStore.user$.subscribe((userData: any) => {
                if (userData) {
            this.userName =userData.name

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

            });
          }

        }

    @ViewChild('certificate') certificateRef!: ElementRef;

    downloadPDF() {
      html2canvas(this.certificateRef.nativeElement).then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save('certificate.pdf');
      });
    }
  }

