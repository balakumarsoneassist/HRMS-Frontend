import { Component, OnInit } from '@angular/core';
import { Icici } from '../model/Icici/icici';
import { IciciService } from '../services/Icici/icici.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
     standalone: true,
      imports:[CommonModule,FormsModule],
  selector: 'app-add-icici-form',
  templateUrl: './add-icici-form.component.html',
  styleUrls: ['./add-icici-form.component.css']
})
export class AddIciciFormComponent implements OnInit {
  model: Icici;
  constructor(private _objIciciService:IciciService) {this.model=new Icici }


  ngOnInit(): void {
    this._objIciciService.IciciSubjectObservable.subscribe(response=>{
    if(response>0)
    {
      this.GetIciciLeadDetail(response);
    }

    })
  }
  AssignLeadToIcici() {
     var displayName=this.model.FirstName;
    this._objIciciService.AssignLeadToIcici(this.model).subscribe(
      response => {
        if(response == true) {
        alert(displayName + " assigned Sucessfully");
         }
         else{
           alert(response);
         }
      },
      error => alert('Cant Save')
    )
  }

  GetIciciLeadDetail(Id)
  {
    this._objIciciService.GetIciciLead(Id).subscribe(
      response => {
        this.model=response[0];
      },
      error => alert('Cant Save')
    )
  }
}
