export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirm: string;
    dateOfBirth: Date;
    gender: string;
    address: string;
    photo: string;
    role: string;
    points: number;
    isRealPhone: boolean;
}
