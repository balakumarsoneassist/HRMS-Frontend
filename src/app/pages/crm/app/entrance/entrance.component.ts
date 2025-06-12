import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { AssideNavComponent } from "../asside-nav/asside-nav.component";
import { RouterModule } from '@angular/router';


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent, AssideNavComponent,RouterModule],
    selector: 'app-entrance',
    templateUrl: './entrance.component.html',
})
export class EntranceComponent implements OnInit {
    contactCardContent = false;
    leadCardContent = false;
    followUpCardContent = false;
    RejectedCardContent = false;
    callsCardContent = false;
    notRespondCardContent = false;

    ngOnInit(): void {
    }
}
