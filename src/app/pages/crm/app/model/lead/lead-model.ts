
export class LeadModel {
    LeadId!:number;
    FirstName?: string;
    LastName?: string;
    MobileNumber?: string;
    Email?: string;
    DateOfBirth?: string;
    PanNumber?: string;
    AadharNumber?: string;
    PresentAddress?: string;
    PermanentAddress?: string;
    Gender?: string;
    MaterialStatus?: string;
    NoOfDependent?: string;
    EducationalQualification?: string;
    Location?:string;
    LocationId!:number;

    OccupationDetails?: any[] = [{Occupation:"", CompanyName: "", CompanyAddress: "", Designation:"", JoiningDate: "", OfficeTelephoneNumber: "", CompanyGSTINNumber: "", IncomeAmount: 0, OtherIncomeAmount:0,IncomeType:""}];
    BankDetails?: any[] = [{BankName: "", Branch: "", IfscCode: "", AccountNumber: ""}];
    LoanHistory?: any[] = [{LoanType: "", LoanAmount: 0, BankName: "", BranchName: "",ROI:0, Tenure: 0, SanctionDate: ""}];
    UnassignedLeadList?:any[]=[{Name: "", Occupation: "", MobileNumber: "", IncomeAmount: 0}];
}
export class OccupationModel{
    public IncomeType!:string;
    public IncomeAmount!:number;
}
export  class TrackIdModel
{
    public ConnectorId!:number;
    public TrackId!:string;
}
