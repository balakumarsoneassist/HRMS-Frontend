export class Qrshops {
    public Name!: string;
    public ContactPerson!: string;
    public PresentAddress!: string;
    public Address1!: string;
    public Referer!: string;
    public City!:string;
    public Pincode!:string;


    public MobileNumber!: string;
    public UpiMobileNumber!: string;
    public EmailId!: string;
    public QrshopsList: any[] = [ {Name: '', ContactPerson: '', City: '', Referer:'', MobileNumber: ''}];

      }

    export class QrCodeGen {
        public CustomerId!: number;
        public OfferCode!: string;
        public ValidFrom!: Date;
        public ValidTo!: Date;
        public QrToken!: string;
        public QRcodefile!:string;
    }
