import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectorFollowUpFormComponent } from "../connector-follow-up-form/connector-follow-up-form.component";
import { ConnectorTrackHistoryComponent } from "../connector-track-history/connector-track-history.component";

@Component({
    standalone: true,
  imports: [CommonModule, FormsModule, ConnectorFollowUpFormComponent, ConnectorTrackHistoryComponent],
  selector: 'app-connector-form-model',
  templateUrl: './connector-form-model.component.html',
  styleUrls: ['./connector-form-model.component.css']
})
export class ConnectorFormModelComponent implements OnInit {

  constructor() { }

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
//   document.getElementById(cityName).style.display = "block";
  const element = document.getElementById(cityName);
if (element) {
  element.style.display = "block";
}
  evt.currentTarget.className += " active";
}
/* content tab - end */

closeModel() {
  let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
  leadFormModel.removeAttribute('style');
}

}
