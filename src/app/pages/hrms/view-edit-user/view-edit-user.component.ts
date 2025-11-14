import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { environment } from '../../../../environments/environment';
import { UserService } from '../services/user/user.service';
import { TabsModule } from 'primeng/tabs';
import { DeletedUserComponent } from "../deleted-user/deleted-user.component";

@Component({
    selector: 'app-view-edit-user',
    standalone: true,
    imports: [
    CommonModule,
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    StepperModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    DeletedUserComponent
],
    templateUrl: './view-edit-user.component.html',
    styleUrls: ['./view-edit-user.component.scss']
})
export class ViewEditUserComponent implements OnInit {
    // Table state
    userList: any[] = [];
    total = 0;
    limit = 10;
    loading = false;
    environment = environment;

    // Filters (optional top bar)
    filterOptions = [
        { label: 'User Name', value: 'user_name' },
        { label: 'Mobile No', value: 'mobile_no' },
        { label: 'Email', value: 'email' }
    ];
    selectedField = this.filterOptions[0];
    searchText = '';

    showDocsDialog = false;
    userDocs: any = null;


    // Dialog + Stepper state
    showDialog = false;
    activeStep = 1;

    // Edit form
    editForm!: FormGroup;
    selectedUser: any = null;

    // Dropdowns
    roles = [
        { label: 'Admin', value: 'Admin' },
        { label: 'Employee', value: 'Employee' },
        { label: 'Intern', value: 'Intern' }
    ];
    policies = [
        { label: 'Default Policy', value: 'Default Policy' },
        { label: 'Special Policy', value: 'Special Policy' }
    ];

    // Default documents
    documents = [
        { name: 'photo', label: 'Photo', accept: 'image/*' },
        { name: 'marksheet10', label: '10th Marksheet', accept: '.pdf' },
        { name: 'marksheet12', label: '12th Marksheet', accept: '.pdf' },
        { name: 'transferCertificate', label: 'Transfer Certificate', accept: '.pdf' }
    ];
    files: Record<string, File | null> = {};

    // Dynamic sections
    prevCompanies: { companyName: string; relieving?: File; experience?: File; payslips: File[] }[] = [
        { companyName: '', payslips: [] }
    ];
    pgCertificates: { certificate?: File | null; marksheet?: File | null }[] = [
        { certificate: null, marksheet: null }
    ];
    ugCertificates: { certificate?: File | null; marksheet?: File | null }[] = [
        { certificate: null, marksheet: null }
    ];

    constructor(private http: HttpClient, private userService: UserService, private fb: FormBuilder) { }
    tabs: { title: string; value: number; content: string }[] = [];

    ngOnInit(): void {
        this.tabs = [
            { title: 'Tab 1', value: 0, content: 'Tab 1 Content' },
            { title: 'Tab 2', value: 1, content: 'Tab 2 Content' },
            { title: 'Tab 3', value: 2, content: 'Tab 3 Content' },
        ];
        this.initForm();
        this.loadUsers({ first: 0, rows: this.limit, page: 0 });
    }

    private initForm() {
        this.editForm = this.fb.group({
            user_name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
            mobile_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            email: ['', [Validators.required, Validators.email]],
            password: [''],
            position: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
            role: ['', Validators.required],
            designation: [''],
            department: ['', [Validators.pattern(/^[A-Za-z ]*$/)]],
            policyName: ['', Validators.required],
            doj: ['', Validators.required],
        });

        // Dynamic validator for designation when role is Admin
        this.editForm.get('role')?.valueChanges.subscribe(role => {
            const desig = this.editForm.get('designation');
            if (role === 'Admin') {
                desig?.addValidators([Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]);
            } else {
                desig?.clearValidators();
            }
            desig?.updateValueAndValidity({ emitEvent: false });
        });
    }

    // ====== TABLE ======
    loadUsers(event: any) {
        this.loading = true;

        const page = (event?.page ?? 0) + 1;
        const limit = event?.rows ?? this.limit;

        let params = new HttpParams().set('page', page).set('limit', limit);

        if (this.searchText?.trim() && this.selectedField?.value) {
            params = params.set(this.selectedField.value, this.searchText.trim());
        }

        this.http.get<any>(`${environment.apiUrl}/api/user`, { params }).subscribe({
            next: (res) => {
                this.userList = res.data ?? [];
                this.total = res.total ?? this.userList.length;
                this.limit = res.limit ?? limit;
                this.loading = false;
            },
            error: () => (this.loading = false)
        });
    }

    onSearch() {
        this.loadUsers({ first: 0, rows: this.limit, page: 0 });
    }

    // ====== EDIT POPUP ======
    openEditDialog(user: any) {
        this.selectedUser = user;
        this.showDialog = true;
        this.activeStep = 1;

        // Patch form
        this.editForm.patchValue({
            user_name: user?.user_name ?? '',
            mobile_no: user?.mobile_no ?? '',
            email: user?.email ?? '',
            password: '',
            position: user?.position ?? '',
            role: user?.role ?? '',
            designation: user?.designation ?? '',
            department: user?.department ?? '',
            policyName: user?.policyName ?? '',
            doj: user?.doj ? new Date(user.doj) : null
        });

        // Prefill dynamic arrays if your API returns them; else keep one blank block
        this.prevCompanies = Array.isArray(user?.prevCompanies) && user.prevCompanies.length
            ? user.prevCompanies.map((c: any) => ({ companyName: c?.companyName ?? '', payslips: [] }))
            : [{ companyName: '', payslips: [] }];

        this.pgCertificates = Array.isArray(user?.pgCertificates) && user.pgCertificates.length
            ? user.pgCertificates.map(() => ({ certificate: null, marksheet: null }))
            : [{ certificate: null, marksheet: null }];

        this.ugCertificates = Array.isArray(user?.ugCertificates) && user.ugCertificates.length
            ? user.ugCertificates.map(() => ({ certificate: null, marksheet: null }))
            : [{ certificate: null, marksheet: null }];

        this.files = {};
    }

    // File handlers
    pickFile(field: string, event: any) {
        const file = event?.files?.[0];
        if (file) this.files[field] = file;
    }

    // Dynamic add/remove
    addCompany() {
        this.prevCompanies.push({ companyName: '', payslips: [] });
    }
    removeCompany(i: number) {
        this.prevCompanies.splice(i, 1);
    }

    addPgCertificate() {
        this.pgCertificates.push({ certificate: null, marksheet: null });
    }
    removePgCertificate(i: number) {
        this.pgCertificates.splice(i, 1);
    }

    addUgCertificate() {
        this.ugCertificates.push({ certificate: null, marksheet: null });
    }
    removeUgCertificate(i: number) {
        this.ugCertificates.splice(i, 1);
    }

    // Save
    saveEditedUser() {
        if (this.editForm.invalid) {
            this.editForm.markAllAsTouched();
            return;
        }

        const fd = new FormData();

        // Form fields
        const formValue = this.editForm.value;
        Object.keys(formValue).forEach(k => {
            // Convert Date to ISO string if needed
            const val = formValue[k] instanceof Date ? (formValue[k] as Date).toISOString() : formValue[k];
            fd.append(k, val ?? '');
        });

        // Simple docs
        for (const key of Object.keys(this.files)) {
            const f = this.files[key];
            if (f) fd.append(key, f);
        }

        // Previous employment
        this.prevCompanies.forEach((c, i) => {
            if (c.companyName) fd.append(`prev[${i}][companyName]`, c.companyName);
            if (c.relieving) fd.append(`prev[${i}][relieving]`, c.relieving);
            if (c.experience) fd.append(`prev[${i}][experience]`, c.experience);
            (c.payslips || []).forEach(p => fd.append(`prev[${i}][payslips]`, p));
        });

        // PG
        this.pgCertificates.forEach((pg, i) => {
            if (pg.certificate) fd.append(`pg[${i}][certificate]`, pg.certificate);
            if (pg.marksheet) fd.append(`pg[${i}][marksheet]`, pg.marksheet);
        });

        // UG
        this.ugCertificates.forEach((ug, i) => {
            if (ug.certificate) fd.append(`ug[${i}][certificate]`, ug.certificate);
            if (ug.marksheet) fd.append(`ug[${i}][marksheet]`, ug.marksheet);
        });

        // PUT update
        this.http.put(`${environment.apiUrl}/api/user/${this.selectedUser._id}`, fd).subscribe({
            next: () => {
                this.showDialog = false;
                this.loadUsers({ first: 0, rows: this.limit, page: 0 });
            },
            error: (err) => console.error('Update failed:', err)
        });
    }

    confirmDelete(user: any) {
        const deletedBy = localStorage.getItem('userId') || 'system';
        const reason = prompt(`Enter reason for deleting user "${user.user_name}":`);
        if (!reason) return;

        if (confirm(`Are you sure you want to delete user "${user.user_name}"?`)) {
            this.userService.deleteUser(user._id, deletedBy, reason).subscribe({
                next: () => {
                    alert('User deleted successfully!');
                    this.loadUsers({ first: 0, rows: this.limit, page: 0 });
                },
                error: (err) => {
                    console.error('Delete failed:', err);
                    alert('Failed to delete user.');
                }
            });
        }
    }

    viewUserDocs(user: any) {
        if (!user?._id) return;
        this.userService.getUserDocsByUserId(user._id).subscribe({
            next: (res) => {
                if (res.success) {
                    this.userDocs = res.data;
                    this.showDocsDialog = true;
                } else {
                    alert('No documents found for this user.');
                }
            },
            error: (err) => {
                console.error('Failed to load user docs:', err);
                alert('Failed to load user documents.');
            }
        });
    }


}
