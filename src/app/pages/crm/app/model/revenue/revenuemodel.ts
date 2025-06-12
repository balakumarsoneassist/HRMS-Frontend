export class RevenueProductModel {
    public id!: number;
    public product!: string;
    public category!: string;
    public percentage!: number;
    public rpname!: string;
    public pname!: string;
}

export class TargetParamModel{
    public month!:string;
    public year!: number;
}

export class TargetEntryModel{
    public  id!: number;
    public month!:string;
    public year!: number;
    public empid!: number;
    public ename!:string;
    public revtarget!:number;
    public fltarget!:number;
    public eidMY!:string;
}

export class AchieveParamModel{
    public month!:string;
    public year!: number;
    public fyear!:string;
    public EmpId!:number;
    public type!:string;
}
