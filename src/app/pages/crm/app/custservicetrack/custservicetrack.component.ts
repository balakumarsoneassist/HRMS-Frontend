import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustservicetrackEntryComponent } from "../custservicetrack-entry/custservicetrack-entry.component";
import { CustservicetrackHistoryComponent } from "../custservicetrack-history/custservicetrack-history.component";

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, CustservicetrackEntryComponent, CustservicetrackHistoryComponent],
    selector: 'app-custservicetrack',
    templateUrl: './custservicetrack.component.html',
    styleUrls: ['./custservicetrack.component.css']
})
export class CustservicetrackComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    closeModel() {
        //let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
        let customerModel = document.querySelector('.callHistoryModel1') as HTMLInputElement;
        // customerModel.style.display = "flex";
        //leadFormModel.removeAttribute('style');
        customerModel.removeAttribute('style');
    }


}
