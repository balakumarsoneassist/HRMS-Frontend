import { Component, OnInit } from '@angular/core';
import { connecterService } from '../services/connector/connecterService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConnectorFormModelComponent } from "../connector-form-model/connector-form-model.component";


@Component({
    standalone: true,
      imports: [CommonModule, FormsModule, ConnectorFormModelComponent],
  selector: 'app-connector-list',
  templateUrl: './connector-list.component.html',
  styleUrls: ['./connector-list.component.css']
})
export class ConnectorListComponent implements OnInit {
  ConnecterList: any;
  constructor(private _objConnecorService:connecterService ) { }
  connectorFilter: any
  ngOnInit(): void {
    this.GetConnectorList();
  }
  GetConnectorList() {
    this._objConnecorService.getConnectorList().subscribe(
      response => {
        this.ConnecterList = response

      },
      error => alert('InternalServer Error')
    )
  }



  callStatus(Id) {//,TrackNumber
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.style.display = "flex";
    this._objConnecorService.statusOpeningAcco();
    this._objConnecorService.SendConnectorId(Id);
    this._objConnecorService.SendConnectorTrack(Id);
  }
}
