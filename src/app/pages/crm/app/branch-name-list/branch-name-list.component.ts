import { Component, OnInit } from '@angular/core';
import { BranchModel } from '../model/Branch/branch-model';
import { BranchServiceService } from '../services/branch/branch-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../pipe/filtering.pipe';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule,FilterPipe],
    selector: 'app-branch-name-list',
    templateUrl: './branch-name-list.component.html',
    styleUrls: ['./branch-name-list.component.css']
})
export class BranchNameListComponent implements OnInit {
    BranchListFilter: any;
    BranchList!: BranchModel[];
    constructor(private objBranchService: BranchServiceService, private router: Router) { }


    ngOnInit(): void {
        this.GetBranchNameList();
    }

    GetBranchNameList() {
        this.objBranchService.GetBranchList().subscribe(
            response => {
                this.BranchList = response
            },
            error => alert('InternalServer Error')
        )
    }
    // editBranch(branchId) {
    //   this.router.navigate(['/home/addbranch'], { queryParams: {id: branchId}});
    // }


    // openBranchModel(Id) {
    //   let cibilReportModel = document.querySelector('.cibilReportModel') as HTMLInputElement;
    //   cibilReportModel.style.display = "flex";
    //   this.objBranchService.EditBranch(Id);
    // }

    editBranch(branchdetail) {
        this.objBranchService.EditBranch({ branchdetail });
    }

}
