export interface IUser {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    passwordConfirm?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: string;
    photo?: string;
    role?: string;
    points?: number;
};

export interface ISportProfile{
    power: number,
    physical: number,
    speed: number,
    skillfull: number,
    reflex: number,
    calm: number,
};