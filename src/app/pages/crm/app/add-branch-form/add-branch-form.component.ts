import { Component, OnInit } from '@angular/core';
import { BranchModel } from '../model/Branch/branch-model';
import { BranchServiceService } from '../services/branch/branch-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BranchNameListComponent } from '../branch-name-list/branch-name-list.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-add-branch-form',
  templateUrl: './add-branch-form.component.html',
  styleUrls: ['./add-branch-form.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BranchNameListComponent,
    ToastModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule
  ]
})
export class AddBranchFormComponent implements OnInit {
  branchForm: FormGroup;
    branchValue!: any;

  constructor(
    private branchService: BranchServiceService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.branchForm = this.fb.group({
      Branch: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.branchService.BranchObservable.subscribe((response) => {
        console.log(response);

      if (response && response.branchdetail) {
        this.branchValue = response.branchdetail.value
        this.branchForm.patchValue({
          Branch: response.branchdetail.display
        });
      }
    });
  }

  SaveBranchDetails() {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      return;
    }
    let payload: any = {
      Branch: this.branchForm.get('Branch')?.value,
    };
    if(this.branchValue){
 payload = {
      Branch: this.branchForm.get('Branch')?.value,
      value: this.branchValue
    };
    }


    this.branchService.SaveBranchDetails(payload).subscribe({
      next: (res) => {
        if (res === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'Branch saved successfully'
          });
          this.branchForm.reset();
          this.branchService.BranchListRefresh();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Duplicate',
            detail: 'Branch name already exists'
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cannot save branch'
        });
      }
    });
  }
}
