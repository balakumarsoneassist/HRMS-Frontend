export class NewContact {
  FirstName?: string;
  LastName?: String;
  MobileNumber?: string;
  EmailId?: string;
  Location?:string;
  UnassignedContactList?: any[] = [{FirstName: "", LastName: "", MobileNumber: "", EmailId: "",Location: ""}];
}
