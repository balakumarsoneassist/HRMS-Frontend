
export class ConnecterFollowUp {
    TrackId!:string;
    ConnectorId!:number;
    IsDirectMeet!:boolean;
    AppoinmentDate?: Date;
    Notes?: string;
    Remarks?: string;
    Status?: number;
    VisitedOn?: Date;
    ConnectorFollowedBy?: string;
}

export class ConnecterTrack {
    TrackId!:string;
    ConnectorId!:number;
}

