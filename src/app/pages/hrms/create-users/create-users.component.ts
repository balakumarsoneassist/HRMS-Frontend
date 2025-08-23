import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';

import { UserService } from '../services/user/user.service';
import { AccessService } from '../services/access/access.service';

type RoleOption = { _id: string; role: string };
type PolicyOption = { label: string; value: string };  // for dropdown

@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    FloatLabelModule,
    CalendarModule
  ],
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss'],
  providers: [MessageService]
})
export class CreateUsersComponent implements OnInit {
  userForm!: FormGroup;
  roles: RoleOption[] = [];
  leavePolicies: PolicyOption[] = [];   // dropdown options as {label,value}
  currentUserId = '678b163cbffdb207e1d7c848'; // TODO: read from token
  currentUser: string = '';
  selectedRoleName: string = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private accesService: AccessService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      mobile_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [null, Validators.required],
      position: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      designation: [''],
      department: ['', [Validators.pattern(/^[A-Za-z ]*$/)]],
      policyName: [null, Validators.required],   // store the string value (e.g., "junior")
      doj: ['', Validators.required],
    });

    // Admin designation requirement
    this.userForm.get('role')?.valueChanges.subscribe(val => {
      this.selectedRoleName = this.resolveRoleName(val);
      const desigCtrl = this.userForm.get('designation');
      if (this.selectedRoleName === 'Admin') {
        desigCtrl?.addValidators([Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]);
      } else {
        desigCtrl?.clearValidators();
      }
      desigCtrl?.updateValueAndValidity({ emitEvent: false });
    });

    this.fetchRoles();
    this.fetchLeavePolicies();
  }

  private resolveRoleName(val: any): string {
    const found = this.roles.find(r => r._id === val);
    if (found?.role) return found.role;
    if (typeof val === 'string' && ['Admin', 'Employee', 'Intern'].includes(val)) return val;
    return '';
  }

  fetchRoles() {
    this.currentUser = String(localStorage.getItem('userRole') || '');

    if (this.currentUser === 'Super Admin') {
      this.roles = [
        { _id: 'Admin', role: 'Admin' },
        { _id: 'Employee', role: 'Employee' },
        { _id: 'Intern', role: 'Intern' },
      ];
    } else {
      this.roles = [
        { _id: '6896e80b9c8f8101f0439813', role: 'Intern' },
        { _id: '6884cc051725e1465c06c2b1', role: 'Employee' },
      ];
    }

    this.userForm.patchValue({ role: this.roles[0]._id });
    this.selectedRoleName = this.roles[0].role;
  }

  fetchLeavePolicies() {
    // API returns string array: ["junior","senior"]
    this.accesService.getLeavePoliciesByRolesStrings().subscribe({
      next: (res: string[]) => {
        // Map to PrimeNG dropdown option format {label, value}
        this.leavePolicies = (res ?? []).map(p => ({ label: this.toTitle(p), value: p }));
        // Optional: set a default selection
        if (this.leavePolicies.length && !this.userForm.get('policyName')?.value) {
          this.userForm.patchValue({ policyName: this.leavePolicies[0].value });
        }
      },
      error: () => {
        this.leavePolicies = [];
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Could not load leave policies' });
      }
    });
  }

  // helper to show "Junior" instead of "junior"
  private toTitle(s: string): string {
    return (s || '').replace(/(^|\\s)\\w/g, m => m.toUpperCase());
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = {
      ...this.userForm.value,
      user_name: this.userForm.value.user_name.trim().toUpperCase(),
      position: this.userForm.value.position.trim().toUpperCase(),
      designation: (this.userForm.value.designation || '').toString().trim().toUpperCase(),
      department: (this.userForm.value.department || '').toString().trim().toUpperCase(),
      // policyName is already the selected string (e.g., "junior" or "senior")
      createdby: this.currentUserId,
      status: true,
      logcal: 0,
    };

    this.userService.createUser(formValue, this.currentUser).subscribe({
      next: () => {

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully!' });
        this.userForm.reset();
        this.fetchRoles();
        this.fetchLeavePolicies();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create user' });
        console.error('Create User Error:', err);
      }
    });
  }

  toUppercase(controlName: string, _e?: FocusEvent) {
    const control = this.userForm.get(controlName);
    if (control && typeof control.value === 'string') {
      control.setValue(control.value.toUpperCase());
    }
  }
}
