export interface Province {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    phone_code: number;
    districts: District[];
}
export interface District {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    province_code: number;
    wards: any[];
}

export interface Ward {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    province_code: number;
    district_code: number;
}
