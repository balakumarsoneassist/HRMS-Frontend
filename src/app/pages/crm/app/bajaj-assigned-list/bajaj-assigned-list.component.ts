import { Component, OnInit } from '@angular/core';
import { BajajService } from '../services/bajaj/bajaj.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
     standalone: true,
      imports:[CommonModule,FormsModule],
  selector: 'app-bajaj-assigned-list',
  templateUrl: './bajaj-assigned-list.component.html',
  styleUrls: ['./bajaj-assigned-list.component.css']
})
export class BajajAssignedListComponent implements OnInit {
  BList: any;
  constructor(private _objBService:BajajService ) { }
  connectorFilter: any
  ngOnInit(): void {
    this.GetBajajAssignList();
  }
  GetBajajAssignList() {
    this._objBService.GetBajajAssignedList().subscribe(
      response => {
        this.BList = response

      },
      error => alert('InternalServer Error')
    )
  }




}
