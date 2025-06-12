import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
  selector: 'app-waitcursor',
  templateUrl: './waitcursor.component.html',
  styleUrls: ['./waitcursor.component.css']
})
export class WaitcursorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
