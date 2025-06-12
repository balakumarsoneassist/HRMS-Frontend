import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact/contact.service';
import { TrackIdModel } from '../model/lead/lead-model';
import { Employee } from '../model/employee/employee';
import { EmployeeService } from '../services/employee/employee.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
     standalone: true,
      imports:[CommonModule,FormsModule,DatePipe],
  selector: 'app-call-track-history',
  templateUrl: './call-track-history.component.html',
  styleUrls: ['./call-track-history.component.css']
})
export class CallTrackHistoryComponent implements OnInit {
  LeadTrackList:any;
  trackParameter:TrackIdModel;
  leadcreator:string="";
  model: Employee;
  leadcrname:any = "";
  leadnamehidden:boolean = true;

  constructor(private service: ContactService, private empService: EmployeeService) {
    this.trackParameter=new TrackIdModel;
    this.model = new Employee();
   }

  ngOnInit(): void {
    this.service.LeadTrackIdObservable.subscribe(response=>{

      this.GetLeadTrackHistoryList(response);
    })
  }
  GetLeadTrackHistoryList(TrackId)
  {
  this.trackParameter.TrackId=TrackId;
  this.service.GetLeadTrackHistoryList(this.trackParameter).subscribe(
    response => {
    //    console.log(response);
        this.LeadTrackList=response;
        this.CheckLeadOwner();

    },
    error => alert('Internal Server Error')
  )
  }

  CheckLeadOwner(){
    console.log(this.LeadTrackList.length)
    let objWork = this.LeadTrackList
    var k:number;
    if(this.LeadTrackList.length > 0){
      for( k=0; k <= this.LeadTrackList.length - 1; k++) {
      //   console.log(k);
        // console.log(this.LeadTrackList[k])
     //    console.log(this.LeadTrackList[k].Status)
         if (this.LeadTrackList[k].Status  == undefined) { break;}
        if (this.LeadTrackList[k].Status  != undefined) {
          if(this.LeadTrackList[k].Status == "leadunassigned"){
            this.leadcreator = this.LeadTrackList[k].ContactFollowby;
            break;
          }
        }

      }

    }
  //  console.log(this.leadcreator);
    if ((this.leadcreator == "") || (this.leadcreator == null))
    {}
    else {
        this.getLeadcreator();
    }

  }


  getLeadcreator(){

      this.empService.GetEmployeeById(this.leadcreator).subscribe(
        response => {
         this.model=response[0];
         //console.log(this.model.Name)
         this.leadcrname = this.model.Name;
        //this.leadnamehidden = false;
        },
        error => alert('Cant Save')
      )

    }

}
