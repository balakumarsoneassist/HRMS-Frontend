import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustservicetrackEntryComponent } from "../custservicetrack-entry/custservicetrack-entry.component";
import { CustservicetrackHistoryComponent } from "../custservicetrack-history/custservicetrack-history.component";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-custservicetrack',
  templateUrl: './custservicetrack.component.html',
  styleUrls: ['./custservicetrack.component.css'],
  imports: [
    CommonModule,
    CustservicetrackEntryComponent,
    CustservicetrackHistoryComponent,
    DialogModule,
    ButtonModule
  ]
})
export class CustservicetrackComponent implements OnInit {
  displayDialog: boolean = false;

  ngOnInit(): void {}

  openDialog() {
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
