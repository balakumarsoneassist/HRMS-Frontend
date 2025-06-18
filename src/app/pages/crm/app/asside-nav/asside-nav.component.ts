
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../model/employee/employee';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
     standalone: true,
      imports:[CommonModule,FormsModule,RouterModule],
  selector: 'app-asside-nav',
  templateUrl: './asside-nav.component.html',
  styleUrls: ['./asside-nav.component.css']
})
export class AssideNavComponent implements OnInit {
  objEmployeeModel: Employee;
  forcontact:any;
  adminRights:any;
  contactrights:any;



  constructor(private _objEmplyeeService: EmployeeService, private routerModule : RouterModule) { this.objEmployeeModel = new Employee }

  ngOnInit(): void {

    this.GetUserRights();
    /* accodian - start */
    let mainMenu = document.getElementsByClassName("mainMenu");
    for (let i = 0; i < mainMenu.length; i++) {
     mainMenu[i].addEventListener("click", (event: any) => {
  const element = event.currentTarget as HTMLElement;
  const subMenus :any = element.nextElementSibling as HTMLElement;

  element.classList.toggle("active");

  if (subMenus.style.maxHeight) {
    subMenus.style.maxHeight = null;
    element.classList.remove("plusToMinus");
  } else {
    subMenus.style.maxHeight = subMenus.scrollHeight + "px";
    element.classList.add("plusToMinus");
  }
});

    }
    /* accodian - end */
  }
 GetUserRights() {
  this._objEmplyeeService.GetEmployeeRights().subscribe({
    next: (response) => {
      this.objEmployeeModel = response[0];
      console.log(this.objEmployeeModel);
      this.checkSplRights();
    },
    error: (err) => {
      console.error(err);
      alert('Internal Server Error');
    }
  });
}


  checkSplRights(){
    this.adminRights = this.objEmployeeModel.IsAdminRights;
    this.contactrights = this.objEmployeeModel.IsContactRights;
    if (this.adminRights){
      localStorage.setItem('usertype', 'admin');
    }
    else{
      localStorage.setItem('usertype', 'employee');
    }

    this.forcontact = true;
    console.log(this.contactrights);
    if(this.contactrights) {
     // console.log("--pi--gh-",this.forcontact);
      this.forcontact = false;
    }
    if ((this.adminRights) && (this.contactrights)) {
      this.forcontact = true;
    }
    //console.log("--pi---",this.forcontact);
  }
  openCibilReportModel() {
    let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    cibilReportModel.style.display = "flex";
  }

  closeModel() {
    let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    cibilReportModel.removeAttribute('style');
  }
  toggleMenu() {
    let nav :any =  document.querySelector<HTMLElement>(".navSec");
    let content : any=  document.querySelector<HTMLElement>('.contentSec');
    if (nav.hasAttribute("style")) {
        nav.removeAttribute("style");
        content.removeAttribute("style");
    } else {
        nav.style.transform = "translateX(-100%)";
        content.style.marginLeft = "0";
    }
  }
}
