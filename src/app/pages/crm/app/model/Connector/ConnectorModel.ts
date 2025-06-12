export class ConnectorModel {
   public FirstName!:string;
   public LastName!: string;
   public MobileNumber!:Number;
   public EmailId!: string;
   public Address!:string;
   public BankId!: number;
   public BankName!: string;
   public AccountNumber!:string;
   public IFSCCode!:String;
   public  PayoutPercentage!:number;
   public IsActive:Boolean=true;
   public BranchId!:Number;

}
export class PaginationModel
{
  public PageRange!:number;
  public PageNumber!:number;
  public SearchText!:string;
}


