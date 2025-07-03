import { Component, OnInit } from '@angular/core';
import { State } from '../model/state/state';
import { StateService } from '../services/state/state.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-state-name-list',
  templateUrl: './state-name-list.component.html',
  styleUrls: ['./state-name-list.component.css'],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule
  ]
})
export class StateNameListComponent implements OnInit {
  form: FormGroup;
  StateList: State[] = [];
  loading = false;

  constructor(
    private stateService: StateService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.GetStateList();
    this.stateService.stateRefreshObservable.subscribe(() => {
      this.GetStateList();
    });
  }

  GetStateList() {
    this.loading = true;
    this.stateService.GetStateList().subscribe({
      next: (response) => {
        this.StateList = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  editState(stateDetail: State) {
    this.stateService.stateEdit({ statedetail: stateDetail });
  }
}
