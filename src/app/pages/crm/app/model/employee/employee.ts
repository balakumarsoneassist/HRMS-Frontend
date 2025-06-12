export class Employee {
  public Name?: string;
  public Qualification?: string;
  public DateOfBirth?: Date;
  public JoinDate?: Date;
  public Designation?: string;
  public Dept?:string;
  public PresentAddress?: string;
  public PermanentAddress?: string;
  public MobileNumber?: string;
  public EmailId?: string;
  public ContactPerson?: string;
  public ContactNumber?: string;
  public IsActive?: boolean=true;
  public IsAdminRights?: boolean =true;
  public IsLeadRights?: boolean =true;
  public IsContactRights?: boolean =true;
  public IsCibilRights?: boolean =true;
  public IsIciciRights?: boolean =true;
  public IsSplRights?: boolean=true;
  public IsReassignRights?: boolean = true;
  public Branch!:CommonValueModel;
  public BranchList!:any[];
  public EmployeeList?: any[] = [ {Name: '', Qualification: '', Designation: '', JoinDate: new Date('Thu Jun 25 2020 00:00:00 GMT+0530 (India Standard Time)'), MobileNumber: '', IsActive:true,IsAdmin:true }];
}
export class CommonValueModel {
      public display?: string="Madurai";
      public value?: number=1;
}
