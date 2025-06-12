import { Component, OnInit, Injectable } from '@angular/core';

import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { LeadDetailFormComponent } from "../lead-detail-form/lead-detail-form.component";
import { CommonModule } from '@angular/common';

/* ng bootstrap datePicker formetting - start */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';
  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}
/* ng bootstrap datePicker formetting - end */

@Component({
    standalone: true,
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}],
  imports: [LeadDetailFormComponent, CommonModule, FormsModule]
})
export class LeadFormComponent implements OnInit {

  constructor() {

   }

  ngOnInit(): void {

  }

  /* content tab - start */
contentTab(evt: any, cityName: any) {
    let i: number, tabcontent: any, tablinks: any;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tabBtn");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    let block : any = document.getElementById(cityName)
    block.style.display = "block";
    evt.currentTarget.className += " active";
  }
  /* content tab - end */








}
