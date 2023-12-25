export interface IStadium {
    _id?: string;
    name?: string;
    contact?: string;
    description?: string;
    rules?: string;
    time_open?: string;
    time_close?: string;
    location?: {
        province: {
            code: String;
            name: String;
        };
        district: {
            code: String;
            name: String;
        };
        ward: {
            code: String;
            name: String;
        };
        address: String;
    };
    avatar?: string;
    images?: string[];
    slug?: string;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    user?: Object;
}

export interface IPromotion {
    _id?: string;
    name: string;
    start_date: string;
    end_date: string;
    type?: string;
    percent: string;
    quantity: string;
    money: string;
    description?: string;
    image?: string;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    stadium?: IStadium;
    stadiumId?: string | IStadium;
}
