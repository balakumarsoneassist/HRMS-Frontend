export class Extcustomer {
    public name?: string;
    public location?: string;
    public loanDate?: Date;
    public mobilenumber?: string;
    public email?: string;


    public product?: string;
    public bank?:string;
    public amount!: string;
    public roi?: string;
    public tracknumber?: string;
    public Id!:number;
    public notes!: string;
    public custfollowedby?: string;

 }

 export class TrackExtCust {
    public Id!:number;
 }

 export class ExtCustFollowUp {
   Id!:number;
   TrackId!:string;
   LeadId!:number;
   IsDirectMeet!:boolean;
   AppoinmentDate?: Date;
   Notes?: string;
   Status?: number;

   OccupationType?: string;
   LoanType?: string;
   DesireLoanAmount?: number;
   Tenure?: number;
   PreferedBank?: string;
   Cibilscore?: number;
   IncomeType?:string;
   IncomeAmount?:number;

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

   SanctionValue?: string;
   IsLegal?: boolean;
   IsTechnical?: boolean;
   SanctionDate:any;
   ContactFollowedBy!:number;
   LeadFollowedBy!:number;
   ConnectorContactId!: number;
   IsConnectorContact!:boolean;
   DisbursementAmount!:number;
   TrackNumber!:string;
}

export class ServiceTrackForm {



   public Nextcall!:Date;
   public Remarks!:string;
   public Id!:number;
   public callattend!:number;

}
export class Servicefreq {
   public   usertype!:string;
}




