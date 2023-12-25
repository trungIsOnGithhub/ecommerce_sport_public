import { IUser } from '.';

export interface ITeam {
    _id?: string;
    name?: string;
    avatar?: string;
    quantity?: string;
    age?: string;
    level?: string;
    description?: string;
    contact?: string;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    core_stadium?: string;
    members?: string[] | IUser[];
    team_leader?: string;
}
