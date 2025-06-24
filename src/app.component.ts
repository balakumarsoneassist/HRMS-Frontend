import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdleService } from './app/pages/donar-app/services/idle.service';
import { LoginService } from './app/pages/donar-app/services/login.service';
import { UserDetailsService } from './app/pages/donar-app/services/user-details.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './app.component.html',

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

funName(){
    console.log("hello");
    let button : any = document.getElementById('button2');
    console.log(button?.style.color);

if (button?.style.color == 'red') {
  button.style.color = 'brown';
}
else{
  button.style.color = 'red';

}

}
}
