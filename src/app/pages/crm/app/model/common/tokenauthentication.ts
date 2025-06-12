
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
export class Tokenauthentication{


    constructor(private router: Router,private loginService:LoginService) {

      }
    public count:number=0;
    checkTokenExpiredStatus(){
        var tokenExpiryTime : any = localStorage.getItem('oneAssistTokenExipyTime');
        var tokenExpiryTimeDateFormat:Date
        tokenExpiryTimeDateFormat = new Date(tokenExpiryTime);
        var currentTime:Date = new Date();
        var timeDifference:number = (tokenExpiryTimeDateFormat.valueOf()-currentTime.valueOf());
        timeDifference = Math.round((timeDifference / 1000) / 60);
        if ((timeDifference<=5&&timeDifference>0)&&this.count==0)
        {
        this.count = this.count + 1;
        this.loginService.RefreshToken().subscribe(response => {

        }
       )
        return;
        }
        else if(timeDifference < 0){
            this.router.navigate([''], { replaceUrl: true})
        }
        else
        {
            if (timeDifference >5) {
                this.count = 0;
            }
        }
    }
}
