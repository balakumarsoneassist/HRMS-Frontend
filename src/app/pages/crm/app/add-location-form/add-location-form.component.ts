import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../model/Location/location-model';
import { BranchServiceService } from '../services/branch/branch-service.service';
import { LocationServiceService } from '../services/location/location-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocationNameListComponent } from "../location-name-list/location-name-list.component";

@Component({
  selector: 'app-add-location-form',
   standalone: true,
    imports: [CommonModule, FormsModule, LocationNameListComponent],
  templateUrl: './add-location-form.component.html',
  styleUrls: ['./add-location-form.component.css']
})
export class AddLocationFormComponent implements OnInit {
model:LocationModel
BranchList:any[] | undefined;
  constructor(private objBranchService:BranchServiceService,private objLocationServeice:LocationServiceService,private route: ActivatedRoute, private router : Router) {this.model=new LocationModel }
  ngOnInit(): void {

    this.objLocationServeice.locationObservable.subscribe(
      response => {
        this.model=response.locationdetail;

      })
    this.GetBranchList();
  }

  SaveLocationDetails(){
    this.objLocationServeice.SaveLocationDetails(this.model).subscribe(
      response => {
        if(response == true) {
        alert("Location Saved Sucessfully");
         }
         else{
          alert("Location Name Already Exist");
        }
      },
      error => alert('Internal Server Error')
  )
    }
    GetBranchList(){
      this.objBranchService.GetBranchList().subscribe(
        response => {

         this.BranchList=response;
        },
        error => alert('Internal Server Error')
      )
    }

    // GetLocationById(Id)
    // {

    //   this.model.Id=Id;
    //   this.objLocationServeice.GetLocationById(this.model).subscribe(
    //     response => {
    //      this.model=response[0];
    //     },
    //     error => alert('Internal Server Error')
    //   )
    // }

}
