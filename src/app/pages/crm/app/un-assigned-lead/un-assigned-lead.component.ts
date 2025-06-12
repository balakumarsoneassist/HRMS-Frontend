import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UnAssignLeadsComponent } from "../un-assign-leads/un-assign-leads.component";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, UnAssignLeadsComponent],
  selector: 'app-un-assigned-lead',
  templateUrl: './un-assigned-lead.component.html',
  styleUrls: ['./un-assigned-lead.component.css']
})
export class UnAssignedLeadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
