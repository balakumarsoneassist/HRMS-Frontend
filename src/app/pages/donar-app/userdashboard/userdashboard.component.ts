import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { UserStore, User } from '../store/user.store';  // import your store
import { UserDetailsService, User } from '../services/user-details.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.scss'
})
export class UserdashboardComponent implements OnInit {
    userName!: string | null;
    user: User | null = null;
    memberShip : number = 0;
    private userStore = inject(UserDetailsService);

    ngOnInit(): void {
        // Access the latest user data
        this.userStore.user$.subscribe((userData) => {
            if(userData){
            this.user = userData;
            // this.memberShip = userData?.membershipStatus
            this.userName = userData?.name ?? null;
}
        });
    }
}
