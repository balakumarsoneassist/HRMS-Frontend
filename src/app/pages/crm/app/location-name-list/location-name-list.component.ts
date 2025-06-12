import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../model/Location/location-model';
import { LocationServiceService } from '../services/location/location-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from "../pipe/filtering.pipe";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, FilterPipe],
  selector: 'app-location-name-list',
  templateUrl: './location-name-list.component.html',
  styleUrls: ['./location-name-list.component.css']
})
export class LocationNameListComponent implements OnInit {
  LocationListFilter:any;
  LocationList!:LocationModel[];
  constructor(private objLocationService:LocationServiceService,private router : Router) { }

  ngOnInit(): void {
    this.GetLocationNameList();
  }
  GetLocationNameList(){
    this.objLocationService.GetLocationList().subscribe(
      response => {
          this.LocationList=response

      },
      error => alert('InternalServer Error')
    )
  }
  editLocation(locationdetail) {
    // this._PatientService.sendPatientDetail(patientDetail);
    this.objLocationService.locationEdit({locationdetail});
  }
}
