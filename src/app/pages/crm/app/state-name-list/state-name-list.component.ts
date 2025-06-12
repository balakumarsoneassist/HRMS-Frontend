import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {State} from'../model/state/state';
import { StateService } from '../services/state/state.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from "../pipe/filtering.pipe";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, FilterPipe],
  selector: 'app-state-name-list',
  templateUrl: './state-name-list.component.html',
  styleUrls: ['./state-name-list.component.css']
})
export class StateNameListComponent implements OnInit {
   StateListFilter: any;
   StateList!:State[];
   model!:State;



  constructor(private objStateService:StateService,private router : Router) { }

  ngOnInit(): void {
    this.GetStateList();
  }
  GetStateList(){
    this.objStateService.GetStateList().subscribe(
      response => {
          this.StateList=response
      },
      error => alert('InternalServer Error')
    )
  }
  editState(statedetail){
    this.objStateService.stateEdit({statedetail});
  }
}
