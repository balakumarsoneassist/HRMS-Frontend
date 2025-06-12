import { Component, OnInit } from '@angular/core';
import { BranchModel } from '../model/Branch/branch-model';
import { BranchServiceService } from '../services/branch/branch-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BranchNameListComponent } from "../branch-name-list/branch-name-list.component";

@Component({
     standalone: true,
      imports: [CommonModule, FormsModule, BranchNameListComponent],
  selector: 'app-add-branch-form',
  templateUrl: './add-branch-form.component.html',
  styleUrls: ['./add-branch-form.component.css']
})
export class AddBranchFormComponent implements OnInit {
  model:BranchModel
  constructor(private _objBranchService:BranchServiceService,private route: ActivatedRoute, private router : Router) {this.model=new BranchModel }
  ngOnInit(): void {
   this._objBranchService.BranchObservable.subscribe(
     response=> {

       this.model.Branch=response.branchdetail.display;
       this.model.Id==response.branchdetail.value;
     });

    var branchId= this.route.snapshot.queryParamMap.get('id');
    if(branchId!=null&&branchId!="")
    {
      this.GetBranchById(branchId);
    }

  }

  SaveBranchDetails()
  {
    this._objBranchService.SaveBranchDetails(this.model).subscribe(
      response => {

        if(response == true) {
        alert("Saved Sucessfully");
         }
         else{
           alert("Branch Name Already Exist");
         }

      },
      error => alert('Internal Server Error')
    )
  }

  GetBranchById(Id)
  {

    this.model.Id=Id;
    this._objBranchService.GetBranchById(this.model).subscribe(
      response => {
       this.model=response[0];
      },
      error => alert('Internal Server Error')
    )
  }
  EditBranchDeatils(Branch){
    this._objBranchService.EditBranch({Branch});
   }


}
