import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ContactService } from '../services/contact/contact.service';
import { LocationServiceService } from '../services/location/location-service.service';
import { ContactModel } from '../model/Contact/ContactModel';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  standalone: true,
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.css'],
  imports: [
    CommonModule,
      MessagesModule,
    MessageModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class AddContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  LocationList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private locationService: LocationServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.fetchLocations();
  }

  buildForm() {
    this.contactForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      EmailId: ['', [Validators.required, Validators.email]],
      LocationId: ['', Validators.required],
      ReferenceName: [''],
      ProductName: ['']
    });
  }

  fetchLocations() {
    this.locationService.GetLocationList().subscribe({
      next: (res) => (this.LocationList = res),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load locations' })
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Please correct the form errors' });
      return;
    }

    const contact: ContactModel = this.contactForm.value;
    const displayName = `${contact.FirstName} ${contact.LastName}`;

    this.contactService.saveContactDetails(contact).subscribe({
      next: (res) => {
        if (res === true) {
          this.messageService.add({ severity: 'success', summary: 'Saved', detail: `${displayName} saved successfully` });
          this.contactForm.reset();
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Exists', detail: 'Contact already exists' });
        }
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save contact' })
    });
  }
}
