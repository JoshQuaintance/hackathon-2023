export type ProductData = {
    createdAt: string;
    updatedAt: string;
    quantity: number;
    case_gtin: number;
    bottle_gtin: number;
    description: string;
    dose: Dose;
    manufacturer: { data: Company };
    ssccs: { data: [SSCC] }
};

export type Dose = {
    name: keyof Dose;
    dose: number;
    units: string;
}

export type Company = {
    name: string;
    description: string;
    email: string;
    company_prefix: string;
    business_location_gln: string;
    dock_gln: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    phone: string;
    company_prefix_gsius: string;
}

export type SSCC = {
    arrived: string;
    sent: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sscc_number: string;
}