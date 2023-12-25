export interface IInvitation {
    _id?: string;
    team: any;
    user: any;
    status: string;
    message: string;
    is_invite_by: string;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
}
