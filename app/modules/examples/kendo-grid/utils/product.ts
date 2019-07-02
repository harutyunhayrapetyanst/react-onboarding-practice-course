export enum UserRole {
    Unspecified = 'Unspecified',
    Technician = 'Technician',
    GeneralOffice = 'GeneralOffice',
    Admin = 'Admin',
    Owner = 'Owner'
}

export enum Supplier {
    Dan = 1,
    Adam,
    Charlie,
    Benjamin
}

export interface Product {
    ProductID: number;
    ProductName: string;
    Supplier: Supplier;
    CategoryID: number;
    QuantityPerUnit: string;
    UnitPrice: number;
    UnitsInStock: number;
    UnitsOnOrder: Date;
    Discontinued: boolean;
    AvailableFor?: UserRole;
}
