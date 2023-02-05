type defaults = {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export type ProductData = {

    case_gtin: string;
    bottle_gtin: string;
    description: string;
    dose: Dose;
    manufacturer: { data: { attributes: Company } };
    ssccs: { data: [{ attributes: SSCC }] };
    stored_at: storedAt;
    Quantity: Quantity
} & defaults

export type Package = {
    products: { data: [{ attributes: ProductData }] };
    gtin: string,
    ssccs: { data: [{ attributes: SSCC }] }
} & defaults

export type Quantity = {
    id: number,
    qty: number,
    type: string,
}

export type Dose = {
    id: number;
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
} & defaults

export type SSCC = {
    arrived: string;
    sent: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sscc: string;
} & defaults

export type storedAt = {
    id: string;
    temperature: number;
    type: string;
}