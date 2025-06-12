import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SvcustomerTrackEntryComponent } from "../svcustomer-track-entry/svcustomer-track-entry.component";
import { SalesvisitreportComponent } from "../salesvisitreport/salesvisitreport.component";

@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, SvcustomerTrackEntryComponent, SalesvisitreportComponent],
  selector: 'app-salesvisit',
  templateUrl: './salesvisit.component.html',
  styleUrls: ['./salesvisit.component.css']
})
export class SalesvisitComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


  }

  closeModel() {
    //let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    let customerModel = document.querySelector('.callHistoryModel') as HTMLInputElement;
   // customerModel.style.display = "flex";
    //leadFormModel.removeAttribute('style');
    customerModel.removeAttribute('style');
  }


}
