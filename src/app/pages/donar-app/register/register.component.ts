import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,InputTextModule,DropdownModule,TextareaModule,ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class  RegisterComponent   {
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
       password: '',
  confirmPassword: ''
    };

    genderOptions = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Other', value: 'Other' }
    ];

    stateOptions = [
      { label: 'Tamil Nadu', value: 'Tamil Nadu' },
      { label: 'Kerala', value: 'Kerala' },
      { label: 'Karnataka', value: 'Karnataka' },
      { label: 'Andhra Pradesh', value: 'Andhra Pradesh' }
    ];

    donorCategories = [
      { label: 'UPI', value: 'UPI' },
      { label: 'Net Banking', value: 'Net Banking' },
      { label: 'Cash', value: 'Cash' },
      { label: 'Cheque', value: 'Cheque' }
    ];

    donationPurposes = [
      { label: 'Build Schools', value: 'Build Schools' },
      { label: 'Debora Ministry', value: 'Debora Ministry' },
      { label: 'Tholamai Ministry', value: 'Tholamai Ministry' },
      { label: 'Full-Time Missionary Support', value: 'Full-Time Missionary Support' },
      { label: 'Youth Missionary Support', value: 'Youth Missionary Support' },
      { label: 'Healthcare', value: 'Healthcare' },
      { label: 'Feeding the Poor', value: 'Feeding the Poor' },
      { label: 'Retired Missionary Housing', value: 'Retired Missionary Housing' },
      { label: 'Church Building', value: 'Church Building' },
      { label: 'Special Categories', value: 'Special Categories' }
    ];



    onSubmit() {
        // Run all validation checks
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
          this.form.password &&
          this.form.confirmPassword &&
          this.form.address &&
          this.form.state &&
          this.form.zip &&
          this.form.donorCategory &&
          this.form.donationPurpose &&
          !this.nameInvalid &&
          !this.mobileInvalid &&
          !this.emailInvalid &&
          !this.passwordInvalid &&
          !this.passwordMismatch;

        if (!isFormValid) {
          alert('Please correct the highlighted errors before submitting the form.');
          return;
        }
        alert('Form successfully submitted!');
      }

      passwordMismatch: any = false;

checkPasswordsMatch() {
  this.passwordMismatch =
    this.form.password &&
    this.form.confirmPassword &&
    this.form.password !== this.form.confirmPassword;
}

// Flags
nameInvalid = false;
mobileInvalid = false;
emailInvalid = false;
passwordInvalid = false;

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
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  this.passwordInvalid = !passwordRegex.test(this.form.password);
}


  }
