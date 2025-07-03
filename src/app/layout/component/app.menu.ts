import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { LoginService } from '../../pages/donar-app/services/login.service';
import { EmployeeService } from '../../pages/crm/app/services/employee/employee.service';

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
  objEmployeeModel: any;
  adminRights: boolean = false;
  contactrights: boolean = false;
  forcontact: boolean = true;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private _objEmplyeeService: EmployeeService
  ) {}

  ngOnInit() {
    this._objEmplyeeService.GetEmployeeRights().subscribe({
      next: (response) => {
        this.objEmployeeModel = response[0];
        console.log(this.objEmployeeModel);
        this.checkSplRights();
        this.buildMenu(); // Build menu after getting rights
      },
      error: (err) => {
        console.error(err);
        alert('Internal Server Error');
      }
    });
  }

  checkSplRights() {
    this.adminRights = this.objEmployeeModel.IsAdminRights;
    this.contactrights = this.objEmployeeModel.IsContactRights;

    localStorage.setItem('usertype', this.adminRights ? 'admin' : 'employee');

    this.forcontact = !(this.contactrights && !this.adminRights);
    console.log('Contact Rights:', this.contactrights);
  }

  buildMenu() {
   this.model = [
  {
    label: 'Home',
    items: [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home']
      }
    ]
  },
  {
    label: 'Revenue',
    items: [
      {
        label: 'Product Master',
        icon: 'pi pi-fw pi-box',
        routerLink: ['/home/revenueprodlist'],
        visible: this.objEmployeeModel?.IsAdminRights
      },
      {
        label: 'Target',
        icon: 'pi pi-fw pi-chart-line',
        routerLink: ['/home/revenuetarget'],
        visible: this.objEmployeeModel?.IsAdminRights
      },
      {
        label: 'Revenue Achievement',
        icon: 'pi pi-fw pi-star',
        routerLink: ['/home/revenueachieve'],
        visible: this.objEmployeeModel?.IsContactRights
      }
    ]
  },
  {
    label: 'Contact',
    visible: this.objEmployeeModel?.IsContactRights,
    items: [
      { label: 'Add', icon: 'pi pi-fw pi-user-plus', routerLink: ['/home/addContactForm'] },
      { label: 'Unassigned', icon: 'pi pi-fw pi-user-minus', routerLink: ['/home/unassignedContacts'] },
      { label: 'List', icon: 'pi pi-fw pi-users', routerLink: ['/home/assignedContacts'] },
      { label: 'ConnectorContact', icon: 'pi pi-fw pi-link', routerLink: ['/home/connectorcontactlist'] },
      { label: 'Import', icon: 'pi pi-fw pi-upload', routerLink: ['/home/ImportContact'] }
    ]
  },
  {
    label: 'Lead',
    visible: this.objEmployeeModel?.IsLeadRights,
    items: [
      { label: 'Add', icon: 'pi pi-fw pi-plus', routerLink: ['/home/leadForm'] },
      { label: 'Unassigned', icon: 'pi pi-fw pi-user-minus', routerLink: ['/home/unAssignLeads'] },
    //   { label: 'Icici Lead List', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/IciciLeadList'] },
    //   { label: 'Bajaj Lead List', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/bajajlist'] },
    //   { label: 'Lead Creators', icon: 'pi pi-fw pi-users', routerLink: ['/home/leadcreaterep'] }
    ]
  },
  {
    label: 'Employee',
    visible: this.objEmployeeModel?.IsAdminRights,
    items: [
      { label: 'Add', icon: 'pi pi-fw pi-user-plus', routerLink: ['/home/employeeForm'] },
      { label: 'List', icon: 'pi pi-fw pi-users', routerLink: ['/home/employeelist'] }
    ]
  },
  {
    label: 'Banking',
    visible: this.objEmployeeModel?.IsAdminRights,
    items: [
      { label: 'Bank', icon: 'pi pi-fw pi-dollar', routerLink: ['/home/addbank'] },
      { label: 'Branch', icon: 'pi pi-fw pi-sitemap', routerLink: ['/home/addbranch'] },
      { label: 'Location', icon: 'pi pi-fw pi-map-marker', routerLink: ['/home/addlocation'] },
      { label: 'State', icon: 'pi pi-fw pi-globe', routerLink: ['/home/addstate'] }
    ]
  },
  {
    label: 'Connector',
    visible: this.objEmployeeModel?.IsContactRights,
    items: [
      { label: 'Add', icon: 'pi pi-fw pi-user-plus', routerLink: ['/home/addConnectorCard'] },
      { label: 'List', icon: 'pi pi-fw pi-users', routerLink: ['/home/ConnectorList'] }
    ]
  },
  {
    label: 'Payment',
    visible: this.objEmployeeModel?.IsContactRights,
    items: [
      { label: 'List', icon: 'pi pi-fw pi-credit-card', routerLink: ['/home/PaymentList'] }
    ]
  },
  {
    label: 'Reports',
    visible: this.objEmployeeModel?.IsAdminRights,
    items: [
      { label: 'Daily Report', icon: 'pi pi-fw pi-calendar', routerLink: ['/home/dailyreport'] },
      { label: 'Report Summary', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home/reportsummary'] },
      { label: 'Status Report Summary', icon: 'pi pi-fw pi-file', routerLink: ['/home/noverallstatusrep'] },
    //   { label: 'Bulk SMS', icon: 'pi pi-fw pi-envelope', routerLink: ['/home/bulksms'] }
    ]
  },
  {
    label: 'QR Code',
    visible: this.objEmployeeModel?.IsSplRights,
    items: [
      { label: 'QR Code Places', icon: 'pi pi-fw pi-map', routerLink: ['/home/qrcodeplaces'] },
      { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/home/qrcodelist'] },
      { label: 'QR Code Generation', icon: 'pi pi-fw pi-qrcode', routerLink: ['/home/qrcodegeneration'] },
      { label: 'QR Code Customers', icon: 'pi pi-fw pi-users', routerLink: ['/home/qrlist'] },
      { label: 'QR Code Download', icon: 'pi pi-fw pi-download', routerLink: ['/home/qrdownload'] }
    ]
  },
  {
    label: 'Contact Report',
    visible: this.objEmployeeModel?.IsContactRights,
    items: [
      { label: 'Report Summary', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home/reportsummarycontact'] },
      { label: 'Bulk SMS', icon: 'pi pi-fw pi-envelope', routerLink: ['/home/bulksms'] }
    ]
  },
//   {
//     label: 'QR Code (Contact)',
//     visible: this.objEmployeeModel?.IsContactRights,
//     items: [
//       { label: 'QR Code Customers', icon: 'pi pi-fw pi-users', routerLink: ['/home/qrlist'] },
//       { label: 'QR Code Download', icon: 'pi pi-fw pi-download', routerLink: ['/home/qrdownload'] }
//     ]
//   },
  {
    label: 'Customers',
    visible: this.objEmployeeModel?.IsContactRights,
    items: [
      { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/home/custlist'] },
      { label: 'My Customers', icon: 'pi pi-fw pi-user', routerLink: ['/home/mycustomers'] },
      { label: 'Service Call Frequency', icon: 'pi pi-fw pi-calendar-clock', routerLink: ['/home/custservicecall'] },
      { label: 'Customer Category', icon: 'pi pi-fw pi-tags', routerLink: ['/home/custrating'] },
      { label: 'Unique Customers', icon: 'pi pi-fw pi-user-edit', routerLink: ['/home/unicustomers'] },
      { label: 'Multiple Loans Customers', icon: 'pi pi-fw pi-clone', routerLink: ['/home/multiloancustomers'] }
    ]
  },
  {
    label: 'Reassign',
    visible: this.objEmployeeModel?.IsReassignRights,
    items: [
      { label: 'Reject Reassign', icon: 'pi pi-fw pi-ban', routerLink: ['/home/reassignreject'] },
      { label: 'Other Reassign', icon: 'pi pi-fw pi-refresh', routerLink: ['/home/reassignother'] }
    ]
  },
  {
    label: 'Sales Visit',
    visible: this.objEmployeeModel?.IsContactRights,
    items: [
      { label: 'Add Customer', icon: 'pi pi-fw pi-user-plus', routerLink: ['/home/addcustomer'] },
      { label: 'Customer Followup', icon: 'pi pi-fw pi-comments', routerLink: ['/home/svfollowup'] },
      { label: 'My Customers', icon: 'pi pi-fw pi-users', routerLink: ['/home/svcmycust'], visible: !this.objEmployeeModel?.IsAdminRights },
      { label: 'Report', icon: 'pi pi-fw pi-chart-line', routerLink: ['/home/svcoverall'], visible: this.objEmployeeModel?.IsAdminRights }
    ]
  }
];

  }
}
