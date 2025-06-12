import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UnAssignLeadsComponent } from "../un-assign-leads/un-assign-leads.component";


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, UnAssignLeadsComponent],
  selector: 'app-icici-assign-new',
  templateUrl: './icici-assign-new.component.html',
  styleUrls: ['./icici-assign-new.component.css']
})
export class IciciAssignNewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



}
