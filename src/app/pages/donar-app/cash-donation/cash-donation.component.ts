import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CashDonationService } from '../services/cashdonation.service';
import { AllUserDetailsService } from '../services/all-user-details.service';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-cash-donation',
  standalone: true,
  imports: [
    TableModule,
    AutoCompleteModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    Toast
  ],
  providers: [MessageService],
  template: `
  <div class="flex flex-col gap-4 w-full max-w-md mx-auto p-4 bg-white rounded shadow">
    <h2 class="text-xl font-semibold mb-4">Donate Now</h2>

    <!-- Customer Type -->
    <div class="flex flex-col gap-2">
      <label for="type">Customer Type</label>
      <p-dropdown
        [options]="[
          { label: 'New', value: 'new' },
          { label: 'Existing', value: 'existing' }
        ]"
        [(ngModel)]="customerType"
        (onChange)="onCustomerTypeChange()"
        optionLabel="label"
        class="w-full"
      />


    </div>

    <!-- Existing User Search -->
    <!-- <div *ngIf="this.existisUser" class="flex flex-col gap-2">
      <label for="search">Search Name/Phone</label>
      <input id="search" pInputText [(ngModel)]="existingSearch" (input)="searchExistingUser()" class="w-full" />

      <p-dropdown
        *ngIf="existingUsers.length"
        [options]="existingUsers"
        [(ngModel)]="selectedExistingUser"
        (onChange)="selectUser(selectedExistingUser)"
        optionLabel="name"
        placeholder="Select user"
        class="w-full"
      />
    </div> -->
<div *ngIf="existisUser" class="flex flex-col gap-2">
  <label for="search">Search Name/Phone</label>
  <p-autoComplete
    [(ngModel)]="selectedExistingUser"
    [suggestions]="existingUsers"
    (completeMethod)="searchExistingUser($event)"
    field="name"
    [dropdown]="true"
    [forceSelection]="true"
    placeholder="Type name or phone"
    (onSelect)="selectUser($event)"
    class="w-full"
  />
</div>

    <!-- Name -->
    <div class="flex flex-col gap-2">
      <label for="name">Name</label>
      <input pInputText id="name" [(ngModel)]="form.name" [disabled]="customerType?.value === 'existing'" class="w-full" />
    </div>

    <!-- Email -->
    <div class="flex flex-col gap-2">
      <label for="email">Email</label>
      <input pInputText id="email" [(ngModel)]="form.email" [disabled]="customerType?.value === 'existing'" class="w-full" />
    </div>

    <!-- Contact -->
    <div class="flex flex-col gap-2">
      <label for="contact">Contact</label>
      <input pInputText id="contact" [(ngModel)]="form.contact" [disabled]="customerType?.value === 'existing'" class="w-full" />
    </div>

    <!-- Amount -->
    <div class="flex flex-col gap-2">
      <label for="amount">Amount (₹)</label>
      <input pInputText id="amount" type="number" [(ngModel)]="form.amount" placeholder="Enter amount" class="w-full" />
    </div>

    <div class="flex justify-end mt-4">
      <button *ngIf="form.amount" pButton type="button" class="p-button-success w-full" (click)="donate()">Donate</button>
    </div>

    <p-toast />
  </div>
  `,
  styleUrls: ['./cash-donation.component.scss']
})
export class CashDonationComponent {
  form: any = {
    name: null,
    email: null,
    contact: null,
    username: null,
    usersid: null,
    amount: null,
    status: 'received',
    method: 'cash',
    userStatus: 'Active'
  };

  customerType : any;
  existingSearch = '';
  existingUsers: any[] = [];
  selectedExistingUser: any = null;
    existisUser: boolean = false;

  constructor(private cashService: CashDonationService, private messageService: MessageService,private allUserDetailsService: AllUserDetailsService) {}

  onCustomerTypeChange() {
    if(this.customerType.value !== 'new') {
this.existisUser = true
    }
    else{
this.existisUser = false
    }
    this.form = {
      name: null,
      email: null,
      contact: null,
      username: null,
      usersid: null,
      amount: null,
      status: 'received',
      method: 'cash',
      userStatus: 'Active'
    };
    this.existingSearch = '';
    this.existingUsers = [];
    this.selectedExistingUser = null;
  }

//   searchExistingUser() {
//     if (this.existingSearch.length < 2) return;
//     this.allUserDetailsService.getallUsers(1,10,this.existingSearch).subscribe({
//       next: (res: any) => {
//         this.existingUsers = res.data || [];
//       },
//       error: () => {
//         this.existingUsers = [];
//       }
//     });
//   }

//   selectUser(user: any) {
//     this.form.name = user.name;
//     this.form.email = user.email;
//     this.form.contact = user.contact;
//     this.form.username = user.username;
//     this.form.usersid = user.id;
//     this.form.amount = null;
//   }


searchExistingUser(event: any) {
  const query = event.query;
  if (query.length < 2) return;

 this.allUserDetailsService.getallUsers(1,10,this.existingSearch).subscribe({
      next: (res: any) => {
        this.existingUsers = res.data || [];
      },
      error: () => {
        this.existingUsers = [];
      }
    });
}

selectUser(value: any) {

  const user = value.value
    console.log(user);

  this.form.name = user.name;
  this.form.email = user.email;
  this.form.contact = user.mobilenumber;
  this.form.username = user.username;
  this.form.usersid = user.id;
  this.form.amount = null;
}

  donate() {
    this.cashService.createDonations(this.form).subscribe({
      next: (res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Donation Successful', detail: res.message || 'Thank you!' });
         this.form = {
      name: null,
      email: null,
      contact: null,
      username: null,
      usersid: null,
      amount: null,
      status: null,
      method: null,
      userStatus: null
    };

      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Donation Failed', detail: err?.error?.message || 'Something went wrong.' });
      }
    });
  }
}
