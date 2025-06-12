
export class LeadFollowUp {
    TrackId!:string;
    LeadId!:number;
    IsDirectMeet!:boolean;
    AppoinmentDate?: Date;
    Notes?: string;
    Status: number = 0;
    DataStrength?: string;
    Compcat?: string;
    Compname?: string;
    Custsegment?: string;

    OccupationType?: string;
    LoanType?: string;
    DesireAmount?: number;
    Tenure?: number;
    PreferedBank?: string;
    Cibilscore?: number;
    IncomeType?:string;
    IncomeAmount:number = 0;

    IsBankStatement:boolean=false;
    IsPaySlip:boolean=false;
    IsForm16:boolean=false;
    IsBusinessProof:boolean=false;
    IsITR:boolean=false;
    IsGstStatement:boolean=false;
    IsCreditcardStatement:boolean=false;
    IsExistingLoanTrack:boolean=false;
    IsCurrentAccountStatement:boolean=false;
    IsStabilityProof:boolean=false;


    IncomeCheck?: string;
    IsIdProof?: boolean=false;
    IsAgeProof?: boolean=false;
    IsAddessProof?: boolean=false;
    IsEncumbranceCertificate?: boolean=false;
    IsTitleDeed?: boolean=false;
    IsParentDeed?: boolean=false;
    IsLayoutPlan?: boolean=false;
    IsRegulationOrder?: boolean=false;
    IsBuildingPermit?: boolean=false;
    IsPropertyTax?: boolean=false;
    IsPatta?: boolean=false;
    IsConstructionAgreement?: boolean=false;
    IsSaleAgreement?: boolean=false;
    IsApf?: boolean=false;
    IsUdsRegistration?: boolean=false;
    IsRcBook?: boolean=false;
    // CurrentAccStatement?: Boolean=false;
    // StabilityProof?: Boolean;
    // PropertyDoc?: Boolean;
    // Ec?: Boolean;
    // BuildingPlan?: Boolean;
    // PropertyTax?: Boolean;

    BankName?: string;
    ApplicationNumber?: string;
    LoginDate?: string;
    LoginValue?:number;
    SanctionROI?: string;
    SanctionTenure?: string;
    SanctionLetter?: any;
    PsdCondition?:PsdTagModel;
    SanctionValue?: string;
    IsLegal?: boolean;
    IsTechnical?: boolean;
    SanctionDate:any;
    ContactFollowedBy!:number;
    LeadFollowedBy!:number;
    ConnectorContactId!: number;
    IsConnectorContact!:boolean;
    DisbursementAmount!:number;
}
export class PsdTagModel
{
    public display!: string;
    public value!: string;
}
