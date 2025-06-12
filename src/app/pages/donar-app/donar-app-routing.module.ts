import { MembershipReceiptComponent } from './membership-receipt/membership-receipt.component';
import { UpdateProfileComponent } from './userdashboard/update-profile/update-profile.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { Component } from '@angular/core';
import { Login } from './../auth/login';
import { Adminlogin } from './login';
import { DonarChartComponent } from './donar-chart/donar-chart.component';
import { Routes } from '@angular/router';
import { MemActivemembersComponent } from './mem-activemembers/mem-activemembers.component';
import { MemNewmembersComponent } from './mem-newmembers/mem-newmembers.component';
import { MemInactivemembersComponent } from './mem-inactivemembers/mem-inactivemembers.component';
import { MemtotalmembersComponent } from './memtotalmembers/memtotalmembers.component';
import { MemblockmembersComponent } from './memblockmembers/memblockmembers.component';
import { DonationTotalComponent } from './donation-total/donation-total.component';
import { DonationVisitingmemComponent } from './donation-visitingmem/donation-visitingmem.component';
import { DonationCashComponent } from './donation-cash/donation-cash.component';
import { ReceiptActiveComponent } from './receipt-active/receipt-active.component';
import { CertificateActiveComponent } from './certificate-active/certificate-active.component';
import { CertificateVisitorComponent } from './certificate-visitor/certificate-visitor.component';
import { CertificateComponent } from './certificate/certificate.component';
import { IdCardComponent } from './id-card/id-card.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { DonateNowComponent } from './userdashboard/donate-now/donate-now.component';
import { LetterPreviewComponent } from './letter-preview/letter-preview.component';
import { MembershipStatusComponent } from './membership-receipt/membership-status.component';
import { ViewmemberComponent } from './viewmember/viewmember.component';
import { DonationReceiptComponent } from './membership-receipt/membership-donation.component';
import { CashDonationComponent } from './cash-donation/cash-donation.component';
export default [
    // Admin routes
    {
        path: 'members/new',
        component: MemNewmembersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'members/active',
        component: MemActivemembersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'members/inactive',
        component: MemInactivemembersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'members/total',
        component: MemtotalmembersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'members/block',
        component: MemblockmembersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'donations/total',
        component: DonationTotalComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'donations/new-cash-donation',
        component: CashDonationComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },

    {
        path: 'donations/active-members',
        component: MemActivemembersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'donations/visitors',
        component: DonationVisitingmemComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'donations/cash',
        component: DonationCashComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'donations/blocked',
        component: MemblockmembersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'receipts/active-members',
        component: ReceiptActiveComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'receipts/visitors',
        component: DonationVisitingmemComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'receipts/blocked',
        component: MemblockmembersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'certificates/active-members',
        component: CertificateActiveComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'certificates/visitors',
        component: CertificateVisitorComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'certificates/blocked',
        component: MemblockmembersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'analytics',
        component: DonarChartComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'cert',
        component: CertificateComponent,
    },
    {
        path: 'viewmember',
        component: ViewmemberComponent,
    },

    // User-only route
    {
        path: 'userDashboard',
        component: UserdashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['user'] }
    },


    {
        path: 'updateProfile',
        component: UpdateProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['user'] }
    },

    {
        path: 'updateProfile',
        component: UpdateProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: ['user'] }
    },

    {
        path: 'donateNow',
        component: DonateNowComponent,
        canActivate: [AuthGuard],
        data: { roles: ['user'] }
    },

    {
        path: 'generateIdCard',
        component: IdCardComponent,
    },

    {
        path: 'generateletter',
        component: LetterPreviewComponent,
    },

    {
        path: 'generatereciept',
        component: MembershipReceiptComponent,
    },
    {
        path: 'membershipstatus',
        component: MembershipStatusComponent,
    },
    {
        path: 'donationreciept',
        component: DonationReceiptComponent,
    },

] as Routes;
