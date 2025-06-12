import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '../model/state/state';
import { StateService } from '../services/state/state.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StateNameListComponent } from "../state-name-list/state-name-list.component";

@Component({
     standalone: true,
      imports: [CommonModule, FormsModule, StateNameListComponent],
  selector: 'app-add-state-form',
  templateUrl: './add-state-form.component.html',
  styleUrls: ['./add-state-form.component.css']
})
export class AddStateFormComponent implements OnInit {
  model: State;
  StateId: any;

  constructor(private objstateservice: StateService, private route: ActivatedRoute, private router: Router) {
    this.model = new State;

  }
  ngOnInit(): void {
    this.objstateservice.stateObservable.subscribe(
      response => {
        this.model=response.statedetail;
      })
    this.StateId = this.route.snapshot.queryParamMap.get('id');
    if (this.StateId != null && this.StateId != "") {
      this.StateId = this.StateId * 1;
      this.GetStateById(this.StateId);
    }

  }
  SaveStateDetails() {
    this.objstateservice.SaveStateDetails(this.model).subscribe(
      Response => {
        if (Response == true) {
          alert("StateName Save Sucess")
        }
        else {
          alert("StateName Already Exist");
        }
      }
    )
    error => alert('Internal Server Error')
  }
  GetStateById(Id) {
    this.objstateservice.GetStateById(Id).subscribe(
      response => {
        this.model = response[0];
      },
      error => {
        alert('Internal Server Error')
      }
    )
  }
}


