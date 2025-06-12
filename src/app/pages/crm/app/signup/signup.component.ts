import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { LoginService } from '../services/login/login.service';
import { LoaderService } from "../services/loader/loader.service";
import { Signup } from '../model/signup';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [CommonModule, InputIconModule, IconFieldModule, FormsModule, ToastModule, InputTextModule, PasswordModule, ButtonModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [MessageService]
})
export class SigninComponent implements OnInit {
    model = new Signup();
    loadSpin = false;
    showPassword = false;

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    constructor(
        private loginService: LoginService,
        public router: Router,
        public loaderService: LoaderService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void { }

    login(form: NgForm) {
        if (form.invalid) {
            form.control.markAllAsTouched();
            return;
        }

        this.loadSpin = true;
        this.loginService.LoginValidation(this.model).subscribe({
            next: (response: any) => {
                localStorage.setItem('oneAssistTokenStorage', JSON.stringify(response));

                const tokenExpiryTime = new Date();
                tokenExpiryTime.setSeconds(tokenExpiryTime.getSeconds() + parseInt(response.expires_in));
                localStorage.setItem('oneAssistTokenExipyTime', tokenExpiryTime.toLocaleString());

                if (response.WarningMessage) {
                    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: response.WarningMessage });
                } else {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful!' });
                }

                this.loadSpin = false;
                this.router.navigate(['../home'], { replaceUrl: true });
            },
            error: (err) => {
                this.loadSpin = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Login Failed',
                    detail: err.error?.error_description || 'Invalid credentials'
                });
            }
        });
    }
}
