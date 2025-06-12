import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../model/employee/employee';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Name:string="";
  EmailId:string="";



  constructor(private router:Router,private employeeService:EmployeeService) { }

  ngOnInit(): void {
  this.GetUserRights();
      /* nav slide toglle - start */
      let selector :any = document.querySelector('.hamburgerBtn')
      selector.addEventListener("click", () => {
        let nav :any  =  document.querySelector<HTMLElement>(".navSec");
        let content :any =  document.querySelector<HTMLElement>('.contentSec');
        if (nav.hasAttribute("style")) {
            nav.removeAttribute("style");
            content.removeAttribute("style");
        } else {
            nav.style.transform = "translateX(-100%)";
            content.style.marginLeft = "0";
        }
    });
/* nav slide toglle - end */




    //dark or lighty theme selector button
     let selects :any  = document.querySelector(".themeBtn")
   selects.addEventListener("click",  () => {
      let body = (document.getElementsByTagName('BODY')[0] as HTMLInputElement);
      body.classList.toggle("darkTheme");
      let themeimg = (document.querySelector('.themeBtn') as HTMLInputElement);
      if (themeimg.src.indexOf('sun.svg') != -1) {
          themeimg.src = 'assets/img/moon.svg';
      } else {
          themeimg.src = 'assets/img/sun.svg';
      }

    });
  }

GoToLogOutPage(){
 localStorage.removeItem('oneAssistTokenStorage')
 this.router.navigate(['../'], { replaceUrl: true})
  }

  ResetPassword()
  {
    this.employeeService.ResetPassword().subscribe(
      response => {
      if(response==true)
      {
        alert("your Reset password Request granted.please check your  mail for reset password.")
      }
      },
      error => alert('Internal Server Error')
    )
  }
  GetUserRights(){
    this.employeeService.GetEmployeeRights().subscribe(
      response=>{
        this.EmailId=response[0].EmailId;
        this.Name=response[0].Name;
      },
      error=>alert('Internal Server Error')
    )
  }
}
