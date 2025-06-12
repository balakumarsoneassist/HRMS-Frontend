import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact/contact.service';
import { LeadtrackService } from '../services/leadtrack/leadtrack.service';
import { LoaderService } from "../services/loader/loader.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports:[CommonModule,FormsModule],
  selector: 'app-onreview',
  templateUrl: './onreview.component.html',
  styleUrls: ['./onreview.component.css']
})
export class OnreviewComponent implements OnInit {

  ReviewList:any;

  loadSpin:number = 0;

  constructor(private contactService: ContactService,private _objLeadTrackService:LeadtrackService, public loaderService: LoaderService) {

   }

  ngOnInit(): void {
   // console.log('hgh');
    this.GetOnReviewList();
  }

  callStatus(Id,TrackNumber) {
    let leadFormModel = document.querySelector('.leadInputModel') as HTMLInputElement;
    leadFormModel.style.display = "flex";
    this.contactService.statusOpeningAcco();
    this.contactService.SendLeadId(Id);
    this.contactService.SendLeadTrack(TrackNumber);
  }

GetOnReviewList(){
  this.loadSpin = 1;

    this._objLeadTrackService.GetReviewList().subscribe(
      response => {
        this.ReviewList = response;
        console.log(response);
        this.loadSpin = 0;
        if (this.ReviewList.length == 0) {

          alert("No records found...!");
          return;
        }

      })
  }

}
