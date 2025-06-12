
import { Component } from '@angular/core';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { StepperModule } from 'primeng/stepper';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-profile',

    standalone: true,
    imports: [
        InputTextModule, FluidModule, ButtonModule, SelectModule,
        FormsModule, TextareaModule, StepperModule, FileUploadModule, PasswordModule
    ],
    template: `
    <p-stepper>
        <p-step label="General Settings">
            <div class="card">
                <p>Avatar</p>
                <p-fileUpload mode="basic" chooseLabel="Upload Avatar"></p-fileUpload>
                <p>Cover Photo</p>
                <p-fileUpload mode="basic" chooseLabel="Upload Cover"></p-fileUpload>
            </div>
        </p-step>
        <p-step label="Basic Information">
            <div class="card flex flex-col gap-4">
                <label for="fullName">Full Name</label>
                <input pInputText id="fullName" type="text" placeholder="Enter your full name" />
                <label for="email">Email</label>
                <input pInputText id="email" type="text" placeholder="Enter your email" />
                <label for="phone">Phone</label>
                <input pInputText id="phone" type="text" placeholder="Enter your phone number" />
            </div>
        </p-step>
        <p-step label="Email Settings">
            <div class="card">
                <label for="newEmail">New Email Address</label>
                <input pInputText id="newEmail" type="text" placeholder="Enter new email" />
            </div>
        </p-step>
        <p-step label="Security Settings">
            <div class="card flex flex-col gap-4">
                <label for="password">New Password</label>
                <input pPassword id="password" placeholder="Enter new password" />
                <label for="confirmPassword">Confirm Password</label>
                <input pPassword id="confirmPassword" placeholder="Confirm new password" />
            </div>
        </p-step>
        <p-step label="Preferences & Payment">
            <div class="card">
                <label for="donation">Donation Category</label>
                <p-select id="donation" [(ngModel)]="selectedCategory" [options]="categories" optionLabel="name" placeholder="Select Category"></p-select>
                <p>Payment Methods</p>
                <p-fileUpload mode="basic" chooseLabel="Add Payment Method"></p-fileUpload>
            </div>
        </p-step>
    </p-stepper>
    `
})
export class ProfileComponent {
    categories = [
        { name: 'Education', code: 'EDU' },
        { name: 'Health', code: 'HLT' },
        { name: 'Environment', code: 'ENV' }
    ];
    selectedCategory = null;
}
