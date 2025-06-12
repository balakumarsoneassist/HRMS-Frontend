// import { BrowserModule } from '@angular/platform-browser';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// //components
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
// import { AssideNavComponent } from './asside-nav/asside-nav.component';
// import { UnassignedContactsComponent } from './unassigned-contacts/unassigned-contacts.component';
// import { AssignedContactsComponent } from './assigned-contacts/assigned-contacts.component';
// import { LeadsDetailsComponent } from './leads-details/leads-details.component';
// import { HomeComponent } from './home/home.component';
// import { AddContactFormComponent } from './add-contact-form/add-contact-form.component';
// import { LeadFormComponent } from './lead-form/lead-form.component';
// import { OnTrackContactComponent } from './on-track-contact/on-track-contact.component';
// import { UnTrackContactComponent } from './un-track-contact/un-track-contact.component';
// import { LeadDetailFormComponent } from './lead-detail-form/lead-detail-form.component';
// import { LeadFollowUpFormComponent } from './lead-follow-up-form/lead-follow-up-form.component';
// import { CallTrackHistoryComponent } from './call-track-history/call-track-history.component';
// import { UnAssignLeadsComponent } from './un-assign-leads/un-assign-leads.component';
// import { OnTrackLeadComponent } from './on-track-lead/on-track-lead.component';
// import { LeadFormModelComponent } from './lead-form-model/lead-form-model.component';
// import { UnAssignedLeadComponent } from './un-assigned-lead/un-assigned-lead.component';
// import { CibilCheckComponent } from './cibil-check/cibil-check.component';
// import { CibilReportListComponent } from './cibil-report-list/cibil-report-list.component';
// import { CibilReportComponent } from './cibil-report/cibil-report.component';
// import { IciciAssignNewComponent } from './icici-assign-new/icici-assign-new.component';
// import { IciciListComponent } from './icici-list/icici-list.component';

// //packages
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
// import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { TagInputModule } from 'ngx-chips';
// //directives
// import { CurrencyIpDirective } from './myDirective/currencyIp/currency-ip.directive';
// import { EmployeeFormComponent } from './employee-form/employee-form.component';
// import { EmployeeListComponent } from './employee-list/employee-list.component';
// import { HttpClientModule } from '@angular/common/http';
// import { SignupComponent } from './signup/signup.component';
// import { EntranceComponent } from './entrance/entrance.component';
// import { AddIciciFormComponent } from './add-icici-form/add-icici-form.component';
// import { AddBankFormComponent } from './add-bank-form/add-bank-form.component';
// import { BankNameListComponent } from './bank-name-list/bank-name-list.component';
// import { UnTrackLeadComponent } from './un-track-lead/un-track-lead.component';
// import { IciciUnassignedLeadComponent } from './icici-unassigned-lead/icici-unassigned-lead.component';
// import { AddBranchFormComponent } from './add-branch-form/add-branch-form.component';
// import { AddLocationFormComponent } from './add-location-form/add-location-form.component';
// import { BranchNameListComponent } from './branch-name-list/branch-name-list.component';
// import { LocationNameListComponent } from './location-name-list/location-name-list.component';
// import { AddStateFormComponent } from './add-state-form/add-state-form.component';
// import { StateNameListComponent } from './state-name-list/state-name-list.component';
// import { AddConnectorFormComponent } from './add-connector-form/add-connector-form.component';
// import { ConnectorListComponent } from './connector-list/connector-list.component';
// import { ConnectorContactListComponent } from './connector-contact-list/connector-contact-list.component';
// import { ImportContactComponent } from './import-contact/import-contact.component';
// import{PaymentListComponent} from './payment-list/payment-list.component';
// import { DailyreporComponent } from './dailyreport/dailyreport.component';
// import { ReportsummaryComponent } from './reportsummary/reportsummary.component';
// import { ReportsummarycontactComponent } from './reportsummarycontact/reportsummarycontact.component';
// import { QrcodeplacesComponent } from './qrcodeplaces/qrcodeplaces.component';
// import { QrcodegenerateComponent } from './qrcodegenerate/qrcodegenerate.component';
// import { QrcodeplaceslistComponent } from './qrcodeplaceslist/qrcodeplaceslist.component';
// import { ConnectorFollowUpFormComponent } from './connector-follow-up-form/connector-follow-up-form.component';
// import { ConnectorFormModelComponent } from './connector-form-model/connector-form-model.component';
// import { ConnectorTrackHistoryComponent } from './connector-track-history/connector-track-history.component';
// import { AddBajajFormComponent } from './add-bajaj-form/add-bajaj-form.component';
// import { BajajAssignedListComponent } from './bajaj-assigned-list/bajaj-assigned-list.component';
// import { QRCodeModule } from 'angularx-qrcode';
// import { QrtestComponent } from './qrtest/qrtest.component';
// import { QrcodecustomersComponent } from './qrcodecustomers/qrcodecustomers.component';
// import { QrcodedownloadComponent } from './qrcodedownload/qrcodedownload.component';
// import { AdminreportComponent } from './adminreport/adminreport.component';
// import { NoverallstatusreportComponent } from './components/noverallstatusreport/noverallstatusreport.component';
// import { NcfallstatusreportComponent } from './components/ncfallstatusreport/ncfallstatusreport.component';
// import { NcfempstatusreportComponent } from './components/ncfempstatusreport/ncfempstatusreport.component';
// import { NlfempstatusreportComponent } from './components/nlfempstatusreport/nlfempstatusreport.component';
// import { NlfallstatusreportComponent } from './components/nlfallstatusreport/nlfallstatusreport.component';
// import { SearchpipePipe } from './pipe/searchpipe.pipe';
// import { BulksmsComponent } from './components/bulksms/bulksms.component';
// import { CustomerlistComponent } from './customerlist/customerlist.component';
// import { CustomerextComponent } from './customerext/customerext.component';
// import { MycustomersComponent } from './mycustomers/mycustomers.component';
// import { CustomertrackComponent } from './customertrack/customertrack.component';
// import { ExtcustomerFollowUpComponent } from './extcustomer-follow-up/extcustomer-follow-up.component';
// import { ExtcustomerTrackHistoryComponent } from './extcustomer-track-history/extcustomer-track-history.component';
// import { ReassignRejectlistComponent } from './reassign-rejectlist/reassign-rejectlist.component';
// import { ReassignOtherlistComponent } from './reassign-otherlist/reassign-otherlist.component';
// import { AddOurbankFormComponent } from './add-ourbank-form/add-ourbank-form.component';
// import { SalesvisitComponent } from './salesvisit/salesvisit.component';
// import { SalesvisitentryComponent } from './salesvisitentry/salesvisitentry.component';
// import { SalesvisitreportComponent } from './salesvisitreport/salesvisitreport.component';

// import { SvcustomerFollowupComponent } from './svcustomer-followup/svcustomer-followup.component';
// import { SvcustomerTrackEntryComponent } from './svcustomer-track-entry/svcustomer-track-entry.component';
// import { SvcustomerMycustomerComponent } from './svcustomer-mycustomer/svcustomer-mycustomer.component';
// import { SvcustomerOverallComponent } from './svcustomer-overall/svcustomer-overall.component';
// import { LeadcreatorComponent } from './leadcreator/leadcreator.component';
// import { LeadsbyempidComponent } from './leadsbyempid/leadsbyempid.component';
// import { CustservicetrackComponent } from './custservicetrack/custservicetrack.component';
// import { CustservicetrackEntryComponent } from './custservicetrack-entry/custservicetrack-entry.component';
// import { CustservicetrackHistoryComponent } from './custservicetrack-history/custservicetrack-history.component';
// import { CustservicecallFreqComponent } from './custservicecall-freq/custservicecall-freq.component';
// import { RevenueproductMasterComponent } from './revenueproduct-master/revenueproduct-master.component';
// import { RevenueproductListComponent } from './revenueproduct-list/revenueproduct-list.component';
// import { RevenuetargetEntryComponent } from './revenuetarget-entry/revenuetarget-entry.component';
// import { RevenuetargetListComponent } from './revenuetarget-list/revenuetarget-list.component';
// import { RevenuetargetAchivementComponent } from './revenuetarget-achivement/revenuetarget-achivement.component';
// import { RevenuetargetDetailsComponent } from './revenuetarget-details/revenuetarget-details.component';
// import { WaitcursorComponent } from './waitcursor/waitcursor.component';
// import { httpInterceptorProviders } from "./interceptors";
// import { LoadertestComponent } from './loadertest/loadertest.component';
// import { OnreviewComponent } from './onreview/onreview.component';
// import { CustratingreportComponent } from './custratingreport/custratingreport.component';
// import { CustratingdetailreportComponent } from './custratingdetailreport/custratingdetailreport.component';
// import { ExistunicustomersComponent } from './existunicustomers/existunicustomers.component';
// import { ExistloanwisecustomersComponent } from './existloanwisecustomers/existloanwisecustomers.component';
// import { MultiloancustomersComponent } from './multiloancustomers/multiloancustomers.component';
// import { MultiloancustomersdetComponent } from './multiloancustomersdet/multiloancustomersdet.component';


// @NgModule({
//   declarations: [
//     AppComponent,
//     HeaderComponent,
//     AssideNavComponent,
//     UnassignedContactsComponent,
//     AssignedContactsComponent,
//     LeadsDetailsComponent,
//     HomeComponent,
//     AddContactFormComponent,
//     LeadFormComponent,
//     OnTrackContactComponent,
//     UnTrackContactComponent,
//     LeadDetailFormComponent,
//     LeadFollowUpFormComponent,
//     CallTrackHistoryComponent,
//     UnAssignLeadsComponent,
//     OnTrackLeadComponent,
//     LeadFormModelComponent,
//     UnAssignedLeadComponent,
//     CibilCheckComponent,
//     CibilReportListComponent,
//     CibilReportComponent,
//     IciciAssignNewComponent,
//     IciciListComponent,
//     //directives
//     CurrencyIpDirective,
//     EmployeeFormComponent,
//     EmployeeListComponent,
//     SignupComponent,
//     EntranceComponent,
//     AddIciciFormComponent,
//     AddBankFormComponent,
//     BankNameListComponent,
//     UnTrackLeadComponent,
//     IciciUnassignedLeadComponent,
//     AddBranchFormComponent,
//     AddLocationFormComponent,
//     BranchNameListComponent,
//     LocationNameListComponent,
//     AddStateFormComponent,
//     StateNameListComponent,
//     AddConnectorFormComponent,
//     ConnectorListComponent,
//     ConnectorContactListComponent,
//     PaymentListComponent,
//     ImportContactComponent,
//     DailyreporComponent,
//     ReportsummaryComponent,
//     ReportsummarycontactComponent,
//     QrcodeplacesComponent,
//     QrcodegenerateComponent,
//     QrcodeplaceslistComponent,
//     ConnectorFollowUpFormComponent,
//     ConnectorFormModelComponent,
//     ConnectorTrackHistoryComponent,
//     AddBajajFormComponent,
//     BajajAssignedListComponent,
//     QrtestComponent,
//     QrcodecustomersComponent,
//     QrcodedownloadComponent,
//     AdminreportComponent,
//     NoverallstatusreportComponent,
//     NcfallstatusreportComponent,
//     NcfempstatusreportComponent,
//     NlfempstatusreportComponent,
//     NlfallstatusreportComponent,
//     SearchpipePipe,
//     BulksmsComponent,
//     CustomerlistComponent,
//     CustomerextComponent,
//     MycustomersComponent,
//     CustomertrackComponent,
//     ExtcustomerFollowUpComponent,
//     ExtcustomerTrackHistoryComponent,
//     ReassignRejectlistComponent,
//     ReassignOtherlistComponent,
//     AddOurbankFormComponent,
//     SalesvisitComponent,
//     SalesvisitentryComponent,
//     SalesvisitreportComponent,

//     SvcustomerFollowupComponent,

//     SvcustomerTrackEntryComponent,

//     SvcustomerMycustomerComponent,

//     SvcustomerOverallComponent,

//     LeadcreatorComponent,

//     LeadsbyempidComponent,

//     CustservicetrackComponent,

//     CustservicetrackEntryComponent,

//     CustservicetrackHistoryComponent,

//     CustservicecallFreqComponent,

//     RevenueproductMasterComponent,

//     RevenueproductListComponent,

//     RevenuetargetEntryComponent,

//     RevenuetargetListComponent,

//     RevenuetargetAchivementComponent,

//     RevenuetargetDetailsComponent,

//     WaitcursorComponent,

//     LoadertestComponent,

//     OnreviewComponent,

//     CustratingreportComponent,

//     CustratingdetailreportComponent,

//     ExistunicustomersComponent,

//     ExistloanwisecustomersComponent,

//     MultiloancustomersComponent,

//     MultiloancustomersdetComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     NgbModule,
//     FormsModule,
//     ReactiveFormsModule,
//     OwlDateTimeModule,
//     OwlNativeDateTimeModule,
//     BrowserAnimationsModule,
//     NgxPaginationModule,
//     Ng2SearchPipeModule,
//     HttpClientModule,
//     QRCodeModule,
//     TagInputModule
//   ],
//   providers: [
//     { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
//     {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-IN'},
//     {provide: LocationStrategy, useClass: HashLocationStrategy},
//     httpInterceptorProviders
//   ],
//   bootstrap: [AppComponent]

// })
// export class AppModule { }
