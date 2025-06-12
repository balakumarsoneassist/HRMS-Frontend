
const rootUrl = "http://localhost:1762";
//const rootUrl = "http://localhost/OneAssistCrmAPI";


//for prod compile
//var UrlProtocol = window.location.protocol;
//const rootUrl = UrlProtocol + "//oneassist.net.in/OneAssistCrmAPI";
//const rootUrl = UrlProtocol + "//oneassist.net.in/OneAssistCrmAPI-test"; 
//const rootUrl = UrlProtocol + "//oneassist.net.in/OneAssistCrmShineAPI"; 
//const rootUrl = UrlProtocol + "//oneassist.net.in/OneAssistCrmScbAPI"; 


const signUpValidationUrl = rootUrl + "/Token";//alert(signUpValidationUrl);
const creditListUrl = rootUrl + "/api/Admin/getcurrentmonthreport?PageNumber=@parameter1&PageRange=@parameter2&SearchText=@parameter3";
const cardsCount = rootUrl + "/api/Admin/getadminportalcount";
const saveLeadDataUrl = rootUrl + "/api/FieldEmployee/directlead";
const saveContactDetailUrl = rootUrl + "/api/Lead/LeadDetailsSave";
const getSingleUserCibilScoreUrl = rootUrl + "/api/Admin/getsingleconsumerreport?PanNumber=@parameter1&MobileNumber=@parameter2";
const getUnassignedLeadUrl = rootUrl + "/api/DashBoard/filterunassignedlead?PageNumber=@parameter1&PageRange=@parameter2&SearchText=@parameter3";
const assignLeadToIciciUrl = rootUrl + "/api/ICICIintegration/assignleadtoicici?leadId=@parameter1";
const getContactListUrl = rootUrl + "/api/Admin/getcontactlist?PageNumber=@parameter1&PageRange=@parameter2&SearchText=@parameter3";
const getLeadListUrl = rootUrl + "/api/Admin/getleadlist?PageNumber=@parameter1&PageRange=@parameter2&SearchText=@parameter3";
var getSingleLeadDataUrl = rootUrl + "/api/Lead/LeadFullDetails/@parameter1";
