import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Api {
   //private static rootUrl= window.location.protocol + "//metleafsolutions.co.in/dev/OneAssistCrmAPI";
   // window.location.host.includes("localhost") === true ? "//localhost:1762"
    private static rootUrl = 'https://oneassist.net.in/OneAssistCrmAPI/'
    // + (
        //for local IIS
   //   "//localhost/OneAssistCrmAPI"
        //for server compile
   //  "//oneassist.net.in/OneAssistCrmAPI"
    // "//oneassist.net.in/OneAssistCrmShineAPI"
    //  "//oneassist.net.in/OneAssistCrmScbAPI"
       //for debug
//    "//localhost:1762"

   //  "//oneassist.net.in/OneAssistCrmAPI-test"


      /*  window.location.host.includes("localhost") === true ? "//localhost"
        : ("//metleafsolutions.co.in/"
            + ( window.location.pathname.includes("/dev/") === true ? "dev"
                : (window.location.pathname.includes("/qa/") === true ? "qa" : "sites")
            )
            + "/OneAssistCrmAPI"
        )*/
    // );

    //bulk sms
    //local host
    //public static sendBulkSmsUrl = window.location.protocol + ("//localhost:52748") + "/api/OTPSend/promotionsms";
    // Server
    public static sendBulkSmsUrl = window.location.protocol + ("//oneassist.net.in/bulksmsAPI") + "/api/OTPSend/promotionsms";


    public static GetTokenUrl=Api.rootUrl+"/token"
    public static RefreshTokenUrl=Api.rootUrl+"/token";
    //Lead
    public static leadPersonalDetailSaveUrl=Api.rootUrl+"/api/Lead/savepersonaldetails";
    public static getunassignLeadListUrl=Api.rootUrl+"/api/Lead/getunassignedleadlist";
    public static GetLeadPersonalDetailUrl=Api.rootUrl+"/api/Lead/getleadpersonaldetails";
    public static GetLeadOccupationalDetailUrl=Api.rootUrl+"/api/Lead/getleadoccupationdetails";
    public static GetLeadListUrl=Api.rootUrl+"/api/Lead/getleadlist";
    //Contact
    public static getunassignContactListUrl=Api.rootUrl+"/api/Contact/getunassignedcontactlist";
    public static contactContactDetailSaveUrl=Api.rootUrl+"/api/Contact/savecontactdetails";
    public static contactListUrl=Api.rootUrl+"/api/Contact/getcontactlist";
    public static ImportDataUrl=Api.rootUrl+"/api/Contact/Importdata";
    public static importExcelFileUrl=Api.rootUrl+"/api/Contact/contactecxcel-list";
    public static dailyCrmReport=Api.rootUrl+"/api/Contact/DailyReport";
    //Employee
    public static SaveEmployeeDetailUrl=Api.rootUrl+"/api/Employee/saveemployee";
    public static GetEmployeeListUrl=Api.rootUrl+"/api/Employee/employeelist";
    public static GetEmployeeRights=Api.rootUrl+"/api/Employee/getemployeerights";
    public static GetEmployeeByIdUrl=Api.rootUrl+"/api/Employee/getemployeebyid";
    public static GetBranchListUrl=Api.rootUrl+"/api/Branch/getbranchlist";
    public static ResetPasswordUrl=Api.rootUrl+"/api/Credential/generateresetpasswordkey";
    public static GetLassigneeListUrl=Api.rootUrl+"/api/Employee/assigneelist";
    public static GetActiveEmpListUrl=Api.rootUrl+"/api/Employee/activeemplist";
    //Cibil
    public static GetOTPRequestUrl=Api.rootUrl+"/api/Cibil/creditreportotp";
    public static GernerateCibilReportUrl=Api.rootUrl+"/api/Cibil/generatecreditreport";
    public static CibilCheckerListUrl=Api.rootUrl+"/api/Cibil/creditreportlist";
    public static SingleCibilreportUrl=Api.rootUrl+"/api/Cibil/getcreditreport";

    //ICICI
    public static AssignLeadToICICI=Api.rootUrl+"/api/Icici/assignlead";
    public static GetIciciLeadUrl=Api.rootUrl+"/api/Icici/geticicileaddetails";
    public static IciciList=Api.rootUrl+"api/Icici/GetIciciList";

    //Bank
    public static SaveBankNameUrl=Api.rootUrl+"/api/Bank/savebankdetails";
    public static GetBankNameList=Api.rootUrl+"/api/Bank/banklist";
    public static GetBankByIdUrl =Api.rootUrl+"api/Bank/getbankbyid";
    //LeadTrack
    public static SaveLeadTrackUrl=Api.rootUrl+"/api/LeadTrack/saveleadtrack";
    public static GetLeadTrackUrl=Api.rootUrl+"/api/LeadTrack/getleadtrack";
    public static GetLeadTracHistoryUrl=Api.rootUrl+"/api/LeadTrack/getleadtrackhistorylist";
    public static AssignEmployeeUrl=Api.rootUrl+"/api/LeadTrack/assignemployeetocontact";
    public static assignEmployeeToLeadUrl=Api.rootUrl+"/api/LeadTrack/assignemployeetolead";
    public static createNewLeadTrack=Api.rootUrl+"/api/LeadTrack/createnewleadtrack";


    //Home
    public static contactUnTrackList=Api.rootUrl+"/api/LeadTrack/getcontactuntrack";
    public static ContactOntrackListUrl=Api.rootUrl+"/api/LeadTrack/getcontactontrack";
    public static leadOntrackListUrl=Api.rootUrl+"/api/LeadTrack/getleadontrack";
    public static leaduntrackListUrl=Api.rootUrl+"/api/LeadTrack/getleaduntrack";

    public static ReviewListUrl=Api.rootUrl+"/api/LeadTrack/getreviewlist";

    //Branch
    public static GetBranchNameListUrl=Api.rootUrl+"/api/Branch/getbranchlist";
    public static SaveBranchDetailsUrl=Api.rootUrl+"/api/Branch/savebranchdetails"
    public static GetBranchByIdUrl=Api.rootUrl+"/api/Branch/getbranchbyid";
    //Location
    public static GetLocationListUrl=Api.rootUrl+"/api/Location/getlocationlist";
    public static SaveLocationDetailsUrl=Api.rootUrl+"/api/Location/savelocationdetails";
    public static GetLocationByIdUrl=Api.rootUrl+"/api/Location/getlocationbyid";

    //state
    public static SaveStateDetailsUrl=Api.rootUrl+"/api/State/savestatedeatils";
    public static GetStateListUrl=Api.rootUrl+"/api/State/getstatelist";
    public static GetStateByIdUrl=Api.rootUrl+"/api/State/getstateByid";

    //cardcount
    public static contactcardUrl=Api.rootUrl+"/api/contact/contactcard";
    public static SaveLeadDetailsUrl=Api.rootUrl+"/api/Lead/SaveLeadDetails";

    //ConnectorContact
    public static connectorContactListUrl=Api.rootUrl+"/api/Contact/connectorcontact-list";
    public static connectorContactUpdateUrl=Api.rootUrl+"/api/Contact/connectercontact-updation";
    //Connector
      public static ConnectorDeatilsUrl=Api.rootUrl+"/api/Connecter/save";
      public static GetConnectorListUrl=Api.rootUrl+"/api/Connecter/list";

      //Payment
      public static paymentListUrl=Api.rootUrl+"/api/Connecter/payment-list";
      public static updatePaymentUrl=Api.rootUrl+"/api/Connecter/update-payment/";

    //Report Pv
    public static getDailyReportUrl=Api.rootUrl+"/api/Report/getdailyuserreport";
    public static getDailyRepSummaryUrl=Api.rootUrl+"/api/Report/getdailyreportsummary";


    //contactlist pvr
    public static contactStatusListUrl=Api.rootUrl+"/api/Contact/statuslist";

    //Qrcode PVR

    public static QrEmployeeListUrl=Api.rootUrl+"/api/Qrcode/emplist";
    public static SaveQrDetailUrl=Api.rootUrl+"/api/Qrcode/saveqrplaces";
    public static GetQrShopsListUrl=Api.rootUrl+"/api/Qrcode/qrplaceslist";
    public static GetQrshopsByIdUrl=Api.rootUrl+"/api/Qrcode/getshopsbyid";
    public static SaveQrTokenUrl=Api.rootUrl+"/api/Qrcode/saveqrtoken";
    public static GetQrTokenListUrl=Api.rootUrl+"/api/Qrcode/qrtokenlist";
    public static GetQrTokenListAllUrl=Api.rootUrl+"/api/Qrcode/qrtokenlistall";

    public static GetAllQrShopsListUrl=Api.rootUrl+"/api/Qrcode/qrplacesalllist";


     //Connector Track  -- PVR
     public static SaveConnectorTrackUrl=Api.rootUrl+"/api/ConnectorTrack/saveConnectortrack";
     public static GetConnectorTrackUrl=Api.rootUrl+"/api/ConnectorTrack/getConnectortrack";
     public static GetConnectorTracHistoryUrl=Api.rootUrl+"/api/ConnectorTrack/getConnectortrackhistorylist";
    // public static AssignEmployeeUrl=Api.rootUrl+"/api/LeadTrack/assignemployeetocontact";
    // public static assignEmployeeToLeadUrl=Api.rootUrl+"/api/LeadTrack/assignemployeetolead";
    // public static createNewLeadTrack=Api.rootUrl+"/api/LeadTrack/createnewleadtrack";

    //Bajaj
    public static AssignLeadtoBajajUrl = Api.rootUrl+"/api/BajajWeb/createbhfllead";
    public static GetBajajLeadUrl=Api.rootUrl+"/api/BajajWeb/getbajajleaddetails";

    public static GetBajajAssinedLeadListUrl=Api.rootUrl+"/api/BajajWeb/getbajajassignedleaddetails";

    //Admin report
    public static GetAdminReporttUrl=Api.rootUrl+"/api/Admin/reportlist";

     constructor(private http:HttpClient,private loginService:LoginService,private router: Router) { }


     //Mega status report
    public static getOverAllStatusReportUrl=Api.rootUrl+"/api/Report/overallstatusreport";
    public static getLFallStatusReportUrl=Api.rootUrl+"/api/Report/leadfollowedstatusall";
    public static getCFallStatusReportUrl=Api.rootUrl+"/api/Report/contactfollowedstatusall";
    public static getLFCFempStatusUrl=Api.rootUrl+"/api/Report/leadcontactfollowedstatusemp";

        //Customer
    public static getCustomerListUrl=Api.rootUrl+"/api/Customer/customerlist";
    public static getExtCustomerUrl=Api.rootUrl+"/api/Customer/getextcustomerdata";
    public static UpdExtCustomerUrl=Api.rootUrl+"/api/Customer/updateextcustomerdata";
    public static AssigncustomerUrl=Api.rootUrl+"/api/Customer/assigncustomerdata";
    public static getAssCustomerListUrl=Api.rootUrl+"/api/Customer/assigncustomerlist";

    public static SaveCustomerTrackUrl=Api.rootUrl+"/api/Customer/updatecustomertrack";

    public static getCustomerTrackUrl=Api.rootUrl+"/api/Customer/getcusttrackdata";
    public static GetCustomerTracHistoryUrl=Api.rootUrl+"/api/Customer/getcustomertrackhistorylist";

    public static SaveServiceCallUrl= Api.rootUrl+"/api/Customer/saveservicecall";
    public static GetServiceCallUrl= Api.rootUrl+"/api/Customer/getservicecalllist";

    public static GetServiceCallFreqUrl= Api.rootUrl+"/api/Customer/getservicecallfreq";

        // Reassign
    public static getRejectListUrl=Api.rootUrl+"/api/Reassign/rejectlist";
    public static rejectReassignUrl=Api.rootUrl+"/api/Reassign/rejectreassign";

    public static getOtherReassignListUrl=Api.rootUrl+"/api/Reassign/otherlist";
    public static rejectOtherReassignUrl=Api.rootUrl+"/api/Reassign/otherreassign";
    public static getRejectByListUrl=Api.rootUrl+"/api/Reassign/getrejectby";
    public static getCownByListUrl=Api.rootUrl+"/api/Reassign/getcontactownby";

    //OurBank
    public static GetOurBankDiffListUrl=Api.rootUrl+"/api/OurBank/ourbankcodeexp";
    public static GetOurBankDetailsListUrl=Api.rootUrl+"/api/OurBank/getourbanklist";
    public static SaveOurBankDetailsUrl=Api.rootUrl+"/api/OurBank/saveourbankdetails";
    public static GetOurBankbyidUrl=Api.rootUrl+"/api/OurBank/getourbankbyid";


    //SalesVisit

    public static SaveSalesVisitUrl = Api.rootUrl+"/api/SalesVisit/savesalesvisit";
    public static GetSVtrackUrl = Api.rootUrl+"/api/SalesVisit/salesvisittrack";
    public static SaveSalesVisitHistoryUrl = Api.rootUrl+"/api/SalesVisit/savesalesvisithistory";
    public static SVCustomerlistUrl = Api.rootUrl+"/api/SalesVisit/svcustomerlist";

    public static SVCmycustlistUrl = Api.rootUrl+"/api/SalesVisit/svcmycustomer";
    public static SVCoverallUrl = Api.rootUrl+"/api/SalesVisit/svcoverall";

    //RevenueProduct

    public static  RevenueProductlistUrl= Api.rootUrl+"/api/Revenue/revenueproductlist";
    public static  SaveRevenueProductUrl = Api.rootUrl+"/api/Revenue/saverevenueproduct";

    public static  RevenueTargetlistUrl= Api.rootUrl+"/api/Revenue/revenueTargetlist";
    public static  SaveRevenueTargetUrl = Api.rootUrl+"/api/Revenue/saverevenuetarget";

    public static  RevenueAchievementUrl= Api.rootUrl+"/api/Revenue/getrevenueachievement";
    public static  RevenueAchievementByempUrl= Api.rootUrl+"/api/Revenue/getrevenueachievementbyemp";
    //Leadcreation

    public static getLeadcrCountUrl=Api.rootUrl+"/api/LeadTrack/getLeadcreateCount";
    public static getLeadcrDetailsUrl=Api.rootUrl+"/api/LeadTrack/getLeadcreateDetaillist";

    //Customer Category report
    public static getCustCatReportUrl=Api.rootUrl+"/api/Report/custcatreport";
    public static getSegmentwiseCustUrl=Api.rootUrl+"/api/Report/segmentwisecust";
    public static getExistCustReportUrl=Api.rootUrl+"/api/Report/existunicustreport";
    public static getLoanwiseCustUrl=Api.rootUrl+"/api/Report/loanwisewisecust";
    //public static getLFallStatusReportUrl=Api.rootUrl+"/api/Report/leadfollowedstatusall";
    public static getMultiloanReportUrl=Api.rootUrl+"/api/Report/multiloanreport";
    public static getMultiloandetUrl=Api.rootUrl+"/api/Report/multiloandetail";


    //private static rootUrl = window.location.protocol + ("//localhost:52748") + "/api/OTPSend/promotionsms"

    count:number=0;


   callPost(Url: string, Parameters?: any): Observable<any> {
    if (!this.checkTokenExpiredStatus()) {
        this.router.navigate(['../'], { replaceUrl: true });
        // Return an empty observable to maintain method signature
        return of(null);
    }

    const tokenString = localStorage.getItem('oneAssistTokenStorage');
    if (!tokenString) {
        console.error('Token not found in localStorage.');
        return of(null);
    }

    let token: any;
    try {
        token = JSON.parse(tokenString);
    } catch (error) {
        console.error('Failed to parse token:', error);
        return of(null);
    }

    const authHeader = new HttpHeaders({
        'Authorization': 'Bearer ' + token.access_token
    });

    const body = (Parameters === null || Parameters === undefined) ? null : Parameters;

    return this.http.post<any>(Url, body, { headers: authHeader });
}

 CallFilePost(Url: string, fileToUpload: File): Observable<any> {
    if (!this.checkTokenExpiredStatus()) {
        this.router.navigate(['../'], { replaceUrl: true });
        return of(null);
    }

    const tokenString = localStorage.getItem('oneAssistTokenStorage');
    if (!tokenString) {
        console.error('Token not found in localStorage.');
        return of(null);
    }

    let token: any;
    try {
        token = JSON.parse(tokenString);
    } catch (error) {
        console.error('Failed to parse token:', error);
        return of(null);
    }

    const authHeader = new HttpHeaders({
        'Authorization': 'Bearer ' + token.access_token
    });

    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);

    return this.http.post<any>(Url, formData, { headers: authHeader });
}


 checkTokenExpiredStatus(): boolean {
    const tokenString = localStorage.getItem('oneAssistTokenStorage');
    if (!tokenString) return false;

    let token: any;
    try {
        token = JSON.parse(tokenString);
    } catch (error) {
        console.error('Invalid token in localStorage:', error);
        return false;
    }

    const expiryString = localStorage.getItem('oneAssistTokenExipyTime');
    if (!expiryString) return false;

    const expiryTime = new Date(expiryString);
    const currentTime = new Date();

    const diffInMinutes = Math.round((expiryTime.getTime() - currentTime.getTime()) / 1000 / 60);

    if (diffInMinutes <= 5 && diffInMinutes > 0 && this.count === 0) {
        this.count++;
        this.loginService.RefreshToken().subscribe({
            next: (response: any) => {
                localStorage.setItem('oneAssistTokenStorage', JSON.stringify(response));
                const newExpiry = new Date();
                newExpiry.setSeconds(newExpiry.getSeconds() + parseInt(response.expires_in));
                localStorage.setItem('oneAssistTokenExipyTime', newExpiry.toLocaleString());
            },
            error: () => {
                return false;
            }
        });
        return true;
    } else if (diffInMinutes < 0) {
        localStorage.removeItem('oneAssistTokenStorage');
        return false;
    } else {
        if (diffInMinutes > 5) {
            this.count = 0;
        }
        return true;
    }
}

}
