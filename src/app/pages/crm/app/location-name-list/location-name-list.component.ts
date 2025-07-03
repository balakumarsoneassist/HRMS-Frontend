import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../model/Location/location-model';
import { LocationServiceService } from '../services/location/location-service.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-location-name-list',
  templateUrl: './location-name-list.component.html',
  styleUrls: ['./location-name-list.component.css'],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule
  ]
})
export class LocationNameListComponent implements OnInit {
  form: FormGroup;
  LocationList: LocationModel[] = [];
  loading = false;

  constructor(
    private locationService: LocationServiceService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.GetLocationNameList();
    this.locationService.locationRefreshObservable.subscribe(() => {
      this.GetLocationNameList();
    });
  }

  GetLocationNameList() {
    this.loading = true;
    this.locationService.GetLocationList().subscribe({
      next: (response) => {
        this.LocationList = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  editLocation(locationdetail: LocationModel) {
    this.locationService.locationEdit({ locationdetail });
  }
}
