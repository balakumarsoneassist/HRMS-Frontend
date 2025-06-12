
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, InputTextModule, DropdownModule, TextareaModule, ButtonModule, FileUploadModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
  form = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    gender: '',
    address: '',
    state: '',
    zip: '',
    donorCategory: '',
    donationPurpose: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  genderOptions = [ /* ... same ... */ ];
  stateOptions = [ /* ... same ... */ ];
  donorCategories = [ /* ... same ... */ ];
  donationPurposes = [ /* ... same ... */ ];

  // Flags
  nameInvalid = false;
  mobileInvalid = false;
  emailInvalid = false;
  passwordInvalid = false;
  passwordMismatch: any = false;

  // Upload handler
  onPhotoUpload(event: any) {
    const file = event.files[0];
    console.log('Uploaded file:', file);
    // Process/upload file here (API call etc.)
    alert('Photo uploaded successfully!');
  }

  // Validation logic
  validateNames() {
    const nameRegex = /^[A-Za-z]+$/;
    this.nameInvalid = !nameRegex.test(this.form.firstName) || !nameRegex.test(this.form.lastName);
  }

  validateMobile() {
    this.mobileInvalid = !/^\d{10}$/.test(this.form.mobile);
  }

  validateEmail() {
    this.emailInvalid = !/^\S+@\S+\.\S+$/.test(this.form.email);
  }

  validatePassword() {
    if (this.form.newPassword) {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      this.passwordInvalid = !passwordRegex.test(this.form.newPassword);
    } else {
      this.passwordInvalid = false;
    }
  }

  checkPasswordsMatch() {
    if (this.form.newPassword || this.form.confirmNewPassword) {
      this.passwordMismatch = this.form.newPassword !== this.form.confirmNewPassword;
    } else {
      this.passwordMismatch = false;
    }
  }

  onSubmit() {
    // Validate all fields
    this.validateNames();
    this.validateMobile();
    this.validateEmail();
    this.validatePassword();
    this.checkPasswordsMatch();

    const isFormValid =
      this.form.firstName &&
      this.form.lastName &&
      this.form.mobile &&
      this.form.email &&
      this.form.gender &&
      this.form.address &&
      this.form.state &&
      this.form.zip &&
      this.form.donorCategory &&
      this.form.donationPurpose &&
      !this.nameInvalid &&
      !this.mobileInvalid &&
      !this.emailInvalid &&
      (!this.form.newPassword || (!this.passwordInvalid && !this.passwordMismatch));

    if (!isFormValid) {
      alert('Please correct errors before submitting.');
      return;
    }

    alert('Profile updated successfully!');
    // Handle profile update logic here (API call)
  }
}
