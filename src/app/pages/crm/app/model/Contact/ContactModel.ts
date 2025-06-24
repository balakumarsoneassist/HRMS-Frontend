export class ContactModel {
    FirstName: string = '';
    LastName: string = '';
    MobileNumber: string = '';
    EmailId: string = '';
    LocationId: number = 0;
    createddt: string = '';
    ramarks: string = '';
    ReferenceName?: string = '';
    SearchText: string = '';

    UnassignedContactList: {
        ReferenceName?: string;
        Id?: string;
        IsConnectorContact?: boolean;
        FirstName: string;
        LastName: string;
        MobileNumber: string;
        EmailId: string;
        Location: string;
        createddt: string;
        remarks: string;
        TotalRows: number;
    }[] = [
            {
                FirstName: '',
                LastName: '',
                MobileNumber: '',
                EmailId: '',
                Location: '',
                createddt: '',
                remarks: '',
                TotalRows: 0,
            },
        ];
    ContactList: any[] = [];
    GetContactList: any[] = [];
    Id: number = 0;
    ProductName: string = '';
}

export class PaginationModel {
    PageRange: number = 1;
    PageNumber: number = 1;
    SearchText: string = '';
    FromDate: Date = new Date();
    ToDate: Date = new Date();
    Status: string = '';
    AssigneeName: string = '';
}
