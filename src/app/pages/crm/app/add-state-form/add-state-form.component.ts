import { Component, OnInit } from '@angular/core';
import { State } from '../model/state/state';
import { StateService } from '../services/state/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StateNameListComponent } from '../state-name-list/state-name-list.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-add-state-form',
  templateUrl: './add-state-form.component.html',
  styleUrls: ['./add-state-form.component.css'],
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StateNameListComponent,
    ToastModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule
  ]
})
export class AddStateFormComponent implements OnInit {
  stateForm: FormGroup;

  constructor(
    private stateService: StateService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.stateForm = this.fb.group({
      StateName: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]{1,32}$/)]],
    });
  }

  ngOnInit(): void {
    this.stateService.stateObservable.subscribe((response) => {
      if (response && response.statedetail) {
        this.stateForm.patchValue(response.statedetail);
      }
    });
  }

  SaveStateDetails() {
    if (this.stateForm.invalid) {
      this.stateForm.markAllAsTouched();
      return;
    }

    const payload: State = this.stateForm.value;

    this.stateService.SaveStateDetails(payload).subscribe({
      next: (res) => {
        if (res === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'State saved successfully'
          });
          this.stateForm.reset();
          this.stateService.stateListRefresh();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Duplicate',
            detail: 'State name already exists'
          });
        }
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cannot save state'
        })
    });
  }
}
