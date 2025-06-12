import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UserDetailsService } from '../services/user-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-letter-preview',
  templateUrl: './letter-preview.component.html',
  styleUrls: ['./letter-preview.component.scss']
})
export class LetterPreviewComponent {
  @ViewChild('letterRef') letterRef!: ElementRef;

  userName = 'John Doe'; // Replace dynamically from route or form
  userAddress = '123 Example Street,\nCity, Country';
   private userStore = inject(UserDetailsService);
    emailFromQuery: string | null;
  constructor(private route: ActivatedRoute) {
      this.emailFromQuery = this.route.snapshot.queryParamMap.get('email');
    }
ngOnInit(): void {
      if(this.emailFromQuery){
        const userData = JSON.parse(this.route.snapshot.queryParamMap.get('email')!);
        this.userName = userData.name,
        this.userAddress = userData.address
      }
      else {
        this.userStore.user$.subscribe((userData: any) => {
            if (userData) {
                this.userName = userData.name,
                this.userAddress = userData.address
            }

        });
      }

    }
  downloadPDF() {
    html2canvas(this.letterRef.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'px', [canvas.width, canvas.height]);
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('letter.pdf');
    });
  }
}
