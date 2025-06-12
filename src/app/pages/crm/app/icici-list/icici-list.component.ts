import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeadFormModelComponent } from "../lead-form-model/lead-form-model.component";


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, LeadFormModelComponent],
  selector: 'app-icici-list',
  templateUrl: './icici-list.component.html',
  styleUrls: ['./icici-list.component.css']
})
export class IciciListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  leadStatus = "Santioned";

  callStatus() {
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.style.display = "flex";
  }


}
