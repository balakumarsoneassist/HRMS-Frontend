
export class DailyReportModel {
    Id!:number;
    Name?: string;
    MobileNumber?: string;
    EmailId?: string;
    AppointmentDate?: string;
    Status?: string;
    TrackNumber?: string;
    Location?: string;
    ReferenceName?: string;
    createdBy?: string;
    Notes?:string;
}

export class PaginationModel1
{
  public PageRange!:number;
  public PageNumber!:number;
  public SearchText!:string;
  public AssigneeName!:string;
  public FromDate!: Date;
  public ToDate!: Date;
}

export class DailyReportSummaryModel {

  Name?: string;
  TotalLeadDayCount?: number;
  TotalCallDayCount?: number;
  AttendCallDayCount?: number;
  RejectCallDayCount?: number;
  PendingCallDayCount?: number;


}

export class SummaryRepInModel
{
public stDate!:Date;
public flag!:string;
}

export class MagarepModel {
  public statuscode!:number;
  public Empid!:number;

}

export class RejectInpModel {
  public selvalues!:string;
  public followedby!:string;
}

export class OtherInpModel {
  public selvalues!:string;
  public followedby!:string;
}

export class RejectbyModel {
  public empid!:number;

}

export class SegmentModel {
  public segment!:string;

}

export class PWCModel {
  public product!:string;

}

export class MLModel {
  public name!:string;

  public mobile!:string;

}
