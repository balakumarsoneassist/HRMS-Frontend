import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-viewmember',
  templateUrl: './viewmember.component.html',
  styleUrl: './viewmember.component.scss',
  standalone: true,
  imports: [TableModule,ButtonModule,CommonModule] // Add PrimeNG modules like ButtonModule and TableModule here
})
export class ViewmemberComponent implements OnInit {
  emailFromQuery!: string | null;
  user: any;
  userDetails: { label: string, value: any }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.emailFromQuery = this.route.snapshot.queryParamMap.get('email');
  }

  ngOnInit(): void {
    if (this.emailFromQuery) {
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

      this.userDetails = [
        { label: 'Profile Picture', value: this.user.profilepic },
        { label: 'Name', value: this.user.name },
        { label: 'ID Number', value: this.user.idNo },
        { label: 'Date of Birth', value: this.user.dob },
        { label: 'Blood Group', value: this.user.blood },
        { label: 'Phone', value: this.user.phone },
        { label: 'Email', value: this.user.email },
        { label: 'Join Date', value: this.user.joinDate },
        { label: 'Expire Date', value: this.user.expireDate },
      ];
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
