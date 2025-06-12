import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDetailsService, User } from '../../services/user-details.service';
import { ButtonModule } from 'primeng/button';
import { RazorpayService } from '../../services/razorpay.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

declare var Razorpay: any;

@Component({
    selector: 'app-donate-now',
    providers: [MessageService],
    standalone: true,
    imports: [Toast,ButtonModule, CommonModule, FormsModule],
    templateUrl: './donate-now.component.html',
    styleUrl: './donate-now.component.scss'
})
export class DonateNowComponent implements OnInit {
    userName!: string | null;
    user: User | null = null;
    form: {
        name: string | null;
        email: string | null;
        contact: string | null;
        amount: number | null;
    } = {
            name: null,
            email: null,
            contact: null,
            amount: null
        };

    private userStore = inject(UserDetailsService);
    private razor = inject(RazorpayService);
    private messageService = inject(MessageService);



    ngOnInit(): void {
        this.userStore.user$.subscribe({
            next: (userData) => {
                this.user = userData;
                this.userName = userData?.name ?? null;
                this.form = {
                    name: userData?.name ?? null,
                    email: userData?.email ?? null,
                    contact: userData?.mobilenumber ?? null,
                    amount: null
                };
            },
            error: (err) => {
                console.error('Failed to load user data:', err);
                this.user = null;
                this.userName = null;
                this.form = {
                    name: null,
                    email: null,
                    contact: null,
                    amount: null
                };
            }
        });

    }

   payWithRazorpay(): void {
    if (!this.form.amount || this.form.amount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
    }

    const options: any = {
        key: 'rzp_test_DlBqVsGRNkaa0n',
        amount: this.form.amount * 100,
        currency: 'INR',
        name: 'Village Missionary Movement',
        description: 'Donation',
        image: '/logo.png',
        prefill: {
            name: this.form.name,
            email: this.form.email,
            contact: this.form.contact
        },
        theme: {
            color: '#6466e3'
        },
        modal: {
            ondismiss: () => {
                console.log('Checkout dismissed');
            }
        },
        handler: (response: any) => {
            console.log('Payment Success:', response);

            // Call backend to verify and save payment
            const payload = {
                razorpay_payment_id: response.razorpay_payment_id,
                amount: this.form.amount,
                name: this.form.name,
                email: this.form.email,
                contact: this.form.contact
            };

           this.razor.verifyPayment(payload).subscribe({
                next: (res: any) => {
                    console.log(res);

                    if (res.success) {
                         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Payment verified and saved successfully!' });
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Payment verified but failed to save on server.' });
                    }
                },
                error: (err:any) => {
                    console.error('Verification failed:', err);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Payment verification failed. Please contact support.' });
                }
            });
        }
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
}

}
