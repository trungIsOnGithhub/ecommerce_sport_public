import { ITeam } from '.';
export interface IMatch {
    _id: string;
    name: string;
    stadium: string;
    address: string;
    from: Date;
    to: Date;
    contact: string;
    type: string;
    level: string;
    description: string;
    accepted: boolean;
    myTeam: ITeam | string;
    yourTeam: ITeam | string;
    teamQueue: string[];
}
