import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdleService } from './app/pages/donar-app/services/idle.service';
import { LoginService } from './app/pages/donar-app/services/login.service';
import { UserDetailsService } from './app/pages/donar-app/services/user-details.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {


      constructor(private idleService: IdleService,private loginService: LoginService, private userStore: UserDetailsService) {}

ngOnInit() {
    const token = this.loginService.getToken();
    if (token) {
        const payload = this.loginService['decodeToken'](token);
         // or make decodeToken public
        if (payload?.username && payload?.role == 'user') {
            this.userStore.loadUser(payload.username, token);
        }
    }
}
}
