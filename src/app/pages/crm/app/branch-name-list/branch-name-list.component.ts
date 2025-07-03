import { Component, OnInit } from '@angular/core';
import { BranchModel } from '../model/Branch/branch-model';
import { BranchServiceService } from '../services/branch/branch-service.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-branch-name-list',
  templateUrl: './branch-name-list.component.html',
  styleUrls: ['./branch-name-list.component.css'],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule
  ]
})
export class BranchNameListComponent implements OnInit {
  form: FormGroup;
  BranchList: BranchModel[] = [];
  loading = false;

  constructor(
    private branchService: BranchServiceService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.GetBranchNameList();
    this.branchService.BranchRefreshObservable.subscribe(() => {
      this.GetBranchNameList();
    });
  }

  GetBranchNameList() {
    this.loading = true;
    this.branchService.GetBranchList().subscribe({
      next: (response) => {
        this.BranchList = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  editBranch(branchdetail: BranchModel) {
    this.branchService.EditBranch({ branchdetail });
  }
}
