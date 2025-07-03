import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../model/Location/location-model';
import { BranchServiceService } from '../services/branch/branch-service.service';
import { LocationServiceService } from '../services/location/location-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationNameListComponent } from '../location-name-list/location-name-list.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-add-location-form',
  templateUrl: './add-location-form.component.html',
  styleUrls: ['./add-location-form.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LocationNameListComponent,
    ToastModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    FloatLabelModule
  ]
})
export class AddLocationFormComponent implements OnInit {
  locationForm: FormGroup;
  BranchList: any[] = [];

  constructor(
    private branchService: BranchServiceService,
    private locationService: LocationServiceService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.locationForm = this.fb.group({
      Location: ['', Validators.required],
      BranchId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getBranchList();
    this.locationService.locationObservable.subscribe((response) => {
      if (response && response.locationdetail) {
        this.locationForm.patchValue(response.locationdetail);
      }
    });
  }

  getBranchList() {
    this.branchService.GetBranchList().subscribe({
      next: (res) => (this.BranchList = res),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to load branches'
        })
    });
  }

  SaveLocationDetails() {
    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      return;
    }

    const payload: LocationModel = this.locationForm.value;

    this.locationService.SaveLocationDetails(payload).subscribe({
      next: (res) => {
        if (res === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'Location saved successfully'
          });
          this.locationForm.reset();
          this.locationService.locationListRefresh();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Duplicate',
            detail: 'Location name already exists'
          });
        }
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cannot save location'
        })
    });
  }
}
