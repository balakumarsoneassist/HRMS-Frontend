import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../model/Contact/ContactModel';
import { ContactService } from '../services/contact/contact.service';
import { Tokenauthentication } from '../model/common/tokenauthentication';
import { BranchServiceService } from '../services/branch/branch-service.service';
import { LocationServiceService } from '../services/location/location-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
     standalone: true,
      imports:[CommonModule,FormsModule],
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.css']
})
export class AddContactFormComponent implements OnInit {
  model: ContactModel;
  LocationList:any[] | undefined;
  constructor(private contactService: ContactService,private objLocationService:LocationServiceService) {
    this.model = new ContactModel;
  }

  ngOnInit(): void {
    this.GetLocationList();

  }

  ContactDetailSubmit() {
    var displayName=this.model.FirstName+" "+this.model.LastName;
    this.contactService.saveContactDetails(this.model).subscribe(
      response => {
        if(response == true) {
        alert(displayName + " Saved Sucessfully");
         }
      },
      error => alert('Internal Server Error')
    )
  }
  GetLocationList(){
    this.objLocationService.GetLocationList().subscribe(
      response=>{
        this.LocationList=response;
      },
      error=>alert('Internal Server Error'+error)
    )
  }
}
