import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExtcustomerFollowUpComponent } from "../extcustomer-follow-up/extcustomer-follow-up.component";
import { ExtcustomerTrackHistoryComponent } from "../extcustomer-track-history/extcustomer-track-history.component";


@Component({
        standalone: true,
        imports: [CommonModule, FormsModule, ExtcustomerFollowUpComponent, ExtcustomerTrackHistoryComponent],
        selector: 'app-customertrack',
        templateUrl: './customertrack.component.html',
        styleUrls: ['./customertrack.component.css']
    })
    export class CustomertrackComponent implements OnInit {

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
