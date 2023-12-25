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

export interface IArea {
    _id: string;
    name: string;
    size: string;
    quantity: number;
    description?: string;
    type?: string;
    status?: string;
    time_price: Array<object>;
    extra_infor?: Array<object>;
    default_price: Number;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    stadium: String;
}
