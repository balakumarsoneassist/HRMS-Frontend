import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { LoginService } from '../../pages/donar-app/services/login.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu implements OnInit {
    model: MenuItem[] = [];
    adminMenu: MenuItem[] = []; // renamed from this.model
    userMenu: MenuItem[] = [];  // renamed from this.model2
    model2 = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
        },
        {
            label: 'UI Components',
            items: [
                { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
                { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
                { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
            ]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: ['/pages'],
            items: [
                {
                    label: 'Landing',
                    icon: 'pi pi-fw pi-globe',
                    routerLink: ['/landing']
                },
                {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/auth/login']
                        },
                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            routerLink: ['/auth/error']
                        },
                        {
                            label: 'Access Denied',
                            icon: 'pi pi-fw pi-lock',
                            routerLink: ['/auth/access']
                        }
                    ]
                },
                {
                    label: 'Crud',
                    icon: 'pi pi-fw pi-pencil',
                    routerLink: ['/pages/crud']
                },
                {
                    label: 'Not Found',
                    icon: 'pi pi-fw pi-exclamation-circle',
                    routerLink: ['/pages/notfound']
                },
                {
                    label: 'Empty',
                    icon: 'pi pi-fw pi-circle-off',
                    routerLink: ['/pages/empty']
                }
            ]
        },
        {
            label: 'Hierarchy',
            items: [
                {
                    label: 'Submenu 1',
                    icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 1.1',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                        {
                            label: 'Submenu 1.2',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                        }
                    ]
                },
                {
                    label: 'Submenu 2',
                    icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 2.1',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                        {
                            label: 'Submenu 2.2',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                        }
                    ]
                }
            ]
        },
        {
            label: 'Get Started',
            items: [
                {
                    label: 'Documentation',
                    icon: 'pi pi-fw pi-book',
                    routerLink: ['/documentation']
                },
                {
                    label: 'View Source',
                    icon: 'pi pi-fw pi-github',
                    url: 'https://github.com/primefaces/sakai-ng',
                    target: '_blank'
                }
            ]
        }
    ];
    constructor(private router: Router, private loginService: LoginService) {}

    ngOnInit() {
        const currentUrl = this.router.url;

        if (currentUrl.includes('register')) {
            this.model = [];
            return;
        }

        // Fill admin menu
        this.adminMenu =  [
            {
                label: 'Dashboard',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Members Overview',
                items: [
                    { label: 'Active Members', icon: 'pi pi-fw pi-users', routerLink: ['/app/members/active'] },
                    { label: 'In Active Members', icon: 'pi pi-fw pi-user-minus', routerLink: ['/app/members/inactive'] },
                    { label: 'Total Members', icon: 'pi pi-fw pi-user', routerLink: ['/app/members/total'] },
                    { label: 'New Members', icon: 'pi pi-fw pi-user-plus', routerLink: ['/app/members/new'] },
                    { label: 'Block Members', icon: 'pi pi-fw pi-ban', routerLink: ['/app/members/block'] }
                ]
            },
            {
                label: 'Donation Overview',
                items: [
                    { label: 'Total Donations', icon: 'pi pi-fw pi-wallet', routerLink: ['/app/donations/total'] },
                    { label: 'Active Members', icon: 'pi pi-fw pi-users', routerLink: ['/app/donations/active-members'] },
                    { label: 'Visitor Donation', icon: 'pi pi-fw pi-user', routerLink: ['/app/donations/visitors'] },
                    { label: 'Cash Donation', icon: 'pi pi-fw pi-dollar', routerLink: ['/app/donations/cash'] },
                    { label: 'Blocked User', icon: 'pi pi-fw pi-user-minus', routerLink: ['/app/donations/blocked'] },
                    { label: 'Cash-Donate', icon: 'pi pi-fw pi-user-minus', routerLink: ['/app/donations/new-cash-donation'] }

                ]
            },
            {
                label: 'Receipt Management',
                items: [
                    { label: 'Active Members', icon: 'pi pi-fw pi-users', routerLink: ['/app/receipts/active-members'] },
                    { label: 'Visitor Donation', icon: 'pi pi-fw pi-user', routerLink: ['/app/receipts/visitors'] },
                    { label: 'Blocked User', icon: 'pi pi-fw pi-user-minus', routerLink: ['/app/receipts/blocked'] }
                ]
            },
            {
                label: 'Certificate Management',
                items: [
                    { label: 'Active Members', icon: 'pi pi-fw pi-users', routerLink: ['/app/certificates/active-members'] },
                    { label: 'Visitor Donation', icon: 'pi pi-fw pi-user', routerLink: ['/app/certificates/visitors'] },
                    { label: 'Blocked User', icon: 'pi pi-fw pi-user-minus', routerLink: ['/app/certificates/blocked'] }
                ]
            },
            {
                label: 'Analytics & Charts',
                icon: 'pi pi-fw pi-chart-line',
                items: [
                    { label: 'Analytics & Charts', icon: 'pi pi-fw pi-chart-line', routerLink: ['/app/analytics'] },
                ],


            },
            {
                label: 'Report Download',
                items: [
                    { label: 'Active Members', icon: 'pi pi-fw pi-users', routerLink: ['/app/reports/active-members'] },
                    { label: 'Visitor Donation', icon: 'pi pi-fw pi-user', routerLink: ['/app/reports/visitors'] },
                    { label: 'Blocked User', icon: 'pi pi-fw pi-user-minus', routerLink: ['/app/reports/blocked'] },
                    { label: 'Cash Donation', icon: 'pi pi-fw pi-dollar', routerLink: ['/app/reports/cash'] }
                ]
            },
            {
                label: 'All User Data',
                icon: 'pi pi-fw pi-database',
                routerLink: ['/app/users/data']
            },
            {
                label: 'Update Software',
                icon: 'pi pi-fw pi-refresh',
                routerLink: ['/update']
            },
            {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
                routerLink: ['/settings']
            }
        ];
        // Fill user menu
        this.userMenu = [
            {
                label: 'Dashboard',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app/userDashboard'] }
                ]
            },
            {
                label: 'Membership',
                items: [
                    { label: 'Apply For Membership', icon: 'pi pi-fw pi-user-plus', routerLink: ['/app/membershipstatus'] },
                    { label: 'Membership Status', icon: 'pi pi-fw pi-info-circle', routerLink: ['/app/membershipstatus'] }
                ]
            },
            {
                label: 'Documents',
                items: [
                    { label: 'Generate ID Card', icon: 'pi pi-fw pi-id-card', routerLink: ['/app/generateIdCard'] },
                    { label: 'Appointment Letter', icon: 'pi pi-fw pi-file', routerLink: ['/app/generateletter'] },
                    { label: 'Our Certificate', icon: 'pi pi-fw pi-certificate', routerLink: ['/app/cert'] }
                ]
            },
            {
                label: 'Profile',
                items: [
                    { label: 'Update Profile', icon: 'pi pi-fw pi-user-edit', routerLink: ['/app/updateProfile'] },
                    { label: 'Account', icon: 'pi pi-fw pi-user', routerLink: ['/app/account'] }
                ]
            },
            {
                label: 'Donations',
                items: [
                    { label: 'Donate Now', icon: 'pi pi-fw pi-credit-card', routerLink: ['/app/donateNow'] },
                    { label: 'Receipt', icon: 'pi pi-fw pi-receipt', routerLink: ['/app/generatereciept'] }
                ]
            }
        ];


        // Set the menu based on role
        const role = this.loginService.getUserRole();

        if (role === 'admin') {
            this.model = this.adminMenu;
        } else if (role === 'user') {
            this.model = this.userMenu;
        } else {
            // fallback if needed
            this.model = [];
        }
    }
}
