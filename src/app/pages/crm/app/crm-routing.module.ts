import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignedContactsComponent } from './assigned-contacts/assigned-contacts.component';
import { LeadsDetailsComponent } from './leads-details/leads-details.component';
import { UnassignedContactsComponent } from './unassigned-contacts/unassigned-contacts.component';
import { HomeComponent } from './home/home.component';
import { AddContactFormComponent } from './add-contact-form/add-contact-form.component';
import { LeadFormComponent } from './lead-form/lead-form.component';
import { OnTrackContactComponent } from './on-track-contact/on-track-contact.component';
import { UnTrackContactComponent } from './un-track-contact/un-track-contact.component';
import { UnAssignedLeadComponent } from './un-assigned-lead/un-assigned-lead.component';
import { CibilCheckComponent } from './cibil-check/cibil-check.component';
import { CibilReportListComponent } from './cibil-report-list/cibil-report-list.component';
import { IciciListComponent } from './icici-list/icici-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SigninComponent } from './signup/signup.component';
import { EntranceComponent } from './entrance/entrance.component';
import { AddIciciFormComponent } from './add-icici-form/add-icici-form.component';
import { AddBankFormComponent } from './add-bank-form/add-bank-form.component';
import { BankNameListComponent } from './bank-name-list/bank-name-list.component';
import { IciciUnassignedLeadComponent } from './icici-unassigned-lead/icici-unassigned-lead.component';
import { AddBranchFormComponent } from './add-branch-form/add-branch-form.component';
import { AddLocationFormComponent } from './add-location-form/add-location-form.component';
import { BranchNameListComponent } from './branch-name-list/branch-name-list.component';
import { LocationNameListComponent } from './location-name-list/location-name-list.component';
import { AddStateFormComponent } from './add-state-form/add-state-form.component';
import { StateNameListComponent } from './state-name-list/state-name-list.component';
import {AddConnectorFormComponent} from  './add-connector-form/add-connector-form.component';
import {ConnectorListComponent} from './connector-list/connector-list.component';
import { ConnectorContactListComponent } from './connector-contact-list/connector-contact-list.component';
import { ImportContactComponent } from './import-contact/import-contact.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { DailyreporComponent } from './dailyreport/dailyreport.component';
import { ReportsummaryComponent } from './reportsummary/reportsummary.component';
import { ReportsummarycontactComponent } from './reportsummarycontact/reportsummarycontact.component';
import { QrcodeplacesComponent } from './qrcodeplaces/qrcodeplaces.component';
import { QrcodegenerateComponent } from './qrcodegenerate/qrcodegenerate.component';
import { QrcodeplaceslistComponent } from './qrcodeplaceslist/qrcodeplaceslist.component';
import { BajajAssignedListComponent } from './bajaj-assigned-list/bajaj-assigned-list.component';
import { QrtestComponent } from './qrtest/qrtest.component';
import { QrcodecustomersComponent } from './qrcodecustomers/qrcodecustomers.component';
import { QrcodedownloadComponent } from './qrcodedownload/qrcodedownload.component';

import { NoverallstatusreportComponent } from './components/noverallstatusreport/noverallstatusreport.component';
import { NcfempstatusreportComponent } from './components/ncfempstatusreport/ncfempstatusreport.component';
import { NcfallstatusreportComponent } from './components/ncfallstatusreport/ncfallstatusreport.component';
import { NlfallstatusreportComponent } from './components/nlfallstatusreport/nlfallstatusreport.component';
import { NlfempstatusreportComponent } from './components/nlfempstatusreport/nlfempstatusreport.component';

import { BulksmsComponent } from './components/bulksms/bulksms.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { MycustomersComponent } from './mycustomers/mycustomers.component';

import { ReassignRejectlistComponent } from './reassign-rejectlist/reassign-rejectlist.component';
import { ReassignOtherlistComponent } from './reassign-otherlist/reassign-otherlist.component';

import { SalesvisitComponent } from './salesvisit/salesvisit.component';
import { SalesvisitentryComponent } from './salesvisitentry/salesvisitentry.component';
import { SvcustomerFollowupComponent } from './svcustomer-followup/svcustomer-followup.component';
import { SvcustomerMycustomerComponent } from './svcustomer-mycustomer/svcustomer-mycustomer.component';
import { SvcustomerOverallComponent } from './svcustomer-overall/svcustomer-overall.component';
import { LeadcreatorComponent } from './leadcreator/leadcreator.component';
import { LeadsbyempidComponent } from './leadsbyempid/leadsbyempid.component';

import { CustservicecallFreqComponent } from './custservicecall-freq/custservicecall-freq.component';
import { RevenueproductMasterComponent } from './revenueproduct-master/revenueproduct-master.component';
import { RevenueproductListComponent } from './revenueproduct-list/revenueproduct-list.component';
import { RevenuetargetEntryComponent } from './revenuetarget-entry/revenuetarget-entry.component';
import { RevenuetargetListComponent } from './revenuetarget-list/revenuetarget-list.component';
import { RevenuetargetAchivementComponent } from './revenuetarget-achivement/revenuetarget-achivement.component';

import { LoadertestComponent } from './loadertest/loadertest.component';
import { CustratingreportComponent } from './custratingreport/custratingreport.component';
import { CustratingdetailreportComponent } from './custratingdetailreport/custratingdetailreport.component';
import { ExistunicustomersComponent } from './existunicustomers/existunicustomers.component';
import { MultiloancustomersComponent } from './multiloancustomers/multiloancustomers.component';
import { AppLayout } from '../../../layout/component/app.layout';



export default [

    // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: SigninComponent},
  { path: 'home', component: AppLayout,
    children: [
      { path: '', component: HomeComponent},
      { path: 'assignedContacts', component: AssignedContactsComponent},
      { path: 'leadsDetails', component: LeadsDetailsComponent},
      { path: 'unassignedContacts', component: UnassignedContactsComponent},
      { path: 'addContactForm', component: AddContactFormComponent},
      { path: 'leadForm', component: LeadFormComponent },
      { path: 'unAssignLeads', component: UnAssignedLeadComponent },
      { path: 'cibilCheck', component: CibilCheckComponent },
      { path: 'cibilList', component: CibilReportListComponent },
      { path: 'iciciList', component: IciciListComponent },
      { path:'iciciUnassignedList',component:IciciUnassignedLeadComponent},
      { path: 'employeeForm', component: EmployeeFormComponent },
      { path: 'employeelist', component: EmployeeListComponent },
      { path: 'addicici', component: AddIciciFormComponent},
      { path: 'addbank', component: AddBankFormComponent},
      { path: 'banknamelist', component: BankNameListComponent},
      { path: 'addbranch', component: AddBranchFormComponent},
      { path: 'addlocation', component: AddLocationFormComponent},
      { path: 'branchlist', component: BranchNameListComponent},
      { path: 'locationlist', component: LocationNameListComponent },
      { path: 'addstate', component: AddStateFormComponent },
      { path: 'StateList', component: StateNameListComponent },
      { path: 'addConnectorCard', component: AddConnectorFormComponent },
      { path: 'connectorcontactlist', component: ConnectorContactListComponent },
      { path: 'ConnectorList' , component: ConnectorListComponent },
      { path: 'ImportContact' , component: ImportContactComponent },
      { path: 'PaymentList' , component: PaymentListComponent },
      { path: 'ImportExcelFileList', component:ImportContactComponent},
      { path: 'dailyreport', component:DailyreporComponent},
      { path: 'reportsummary', component:ReportsummaryComponent},
      { path: 'reportsummarycontact', component:ReportsummarycontactComponent},
      { path: 'qrcodeplaces', component:QrcodeplacesComponent},
      { path: 'qrcodelist', component: QrcodeplaceslistComponent},
      { path: 'qrcodegeneration', component:QrcodegenerateComponent},
      { path: 'bajajlist', component:BajajAssignedListComponent},
      { path: 'qrtest', component:QrtestComponent},
      { path: 'qrlist', component: QrcodecustomersComponent},
      { path: 'qrdownload', component: QrcodedownloadComponent},

      { path: 'noverallstatusrep', component: NoverallstatusreportComponent},
      { path: 'ncfallreport', component: NcfallstatusreportComponent},
      { path: 'ncfempreport', component: NcfempstatusreportComponent},
      { path: 'nlfallreport', component: NlfallstatusreportComponent},
      { path: 'nlfempreport', component: NlfempstatusreportComponent},
      { path: 'bulksms', component: BulksmsComponent},
      { path: 'custlist', component:CustomerlistComponent},
      { path: 'mycustomers', component:MycustomersComponent},
      { path: 'reassignreject', component:ReassignRejectlistComponent},
      { path: 'reassignother', component:ReassignOtherlistComponent},
      { path: 'salesvisit', component:SalesvisitComponent},
      { path: 'addcustomer', component:SalesvisitentryComponent},
      { path: 'svfollowup', component:SvcustomerFollowupComponent},
      { path: 'svcmycust', component:SvcustomerMycustomerComponent},
      { path: 'svcoverall', component:SvcustomerOverallComponent},
      { path: 'leadcreaterep', component:LeadcreatorComponent},
      { path: 'leadbyeid', component:LeadsbyempidComponent},
      { path: 'custservicecall', component:CustservicecallFreqComponent},
      { path: 'revenueprodmaster' , component:RevenueproductMasterComponent},
      { path: 'revenueprodlist' , component:RevenueproductListComponent},
      { path: 'revenuetarget' , component:RevenuetargetEntryComponent},
      { path: 'revenuetargetlist' , component:RevenuetargetListComponent},
      { path: 'revenueachieve' , component:RevenuetargetAchivementComponent},
      { path: 'loadtest', component:LoadertestComponent},
      { path: 'custrating', component:CustratingreportComponent},
      { path: 'custratingdet', component:CustratingdetailreportComponent},
      { path: 'unicustomers', component:ExistunicustomersComponent},
      { path: 'multiloancustomers', component:MultiloancustomersComponent}
    ]
  },
] as Routes;
