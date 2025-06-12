import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee/employee';
import { EmployeeService } from '../services/employee/employee.service';


import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { TagInputModule } from 'ngx-chips';

@Component({
    standalone: true,
      imports:[CommonModule,FormsModule,CalendarModule,TagInputModule],
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(private employeeService: EmployeeService) {
    this.model = new Employee();
  }

  ngOnInit(): void {
    this.stateData = history.state.data;
    if(this.stateData) {
      this.model = this.stateData;
    }
    this.GetBranchList();
    this.employeeService.EmployeeSubjectObservable.subscribe(response=>{
      this.GetEmployeeById(response);
    })

  }
  stateData: any;
  model: Employee;
  tagInputList: any[] = [];
  employeeSubmit() {
     var displayName=this.model.Name;
     console.log(this.model)
    this.employeeService.SaveEmployeeDetails(this.model).subscribe(
      response => {
        if(response == true) {
        alert(displayName + " Saved Sucessfully");
        this.employeeService.EmployeeListRefresh();
        this.closeModel();
         }
         else{
          alert("EmailId Already Exist");
         }
      },
      error => alert('Cant Save')
    )
  }
  GetEmployeeById(EmployeeId)
  {
    this.employeeService.GetEmployeeById(EmployeeId).subscribe(
      response => {
       this.model=response[0];
      },
      error => alert('Cant Save')
    )
  }
  closeModel() {
    let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    cibilReportModel.removeAttribute('style');
  }

  GetBranchList()
  {
    this.employeeService.GetBranchList().subscribe(
      response => {
       this.tagInputList=response;
      },
      error => alert('Cant Save')
    )
  }
}
