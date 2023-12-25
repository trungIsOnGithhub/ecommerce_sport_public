import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Invitation from '../models/Invitation.model';
import Team from '../models/Team.model';

import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

export const createInvitationByLeader = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { team, user, message } = req.body;

    const teamRes = await Team.findOne({ _id: team, team_leader: res.locals.user._id });
    if (!teamRes) return next(new AppError(401, 'You are not a leader of this team'));

    const invitation = await Invitation.create({
        team,
        user,
        message,
        is_invite_by: 'Leader',
    });
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            invitation,
        },
    });
});

export const createInvitationByUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { team, status, message } = req.body;

    const invitation = await Invitation.create({
        team,
        message,
        user: res.locals.user._id,
        is_invite_by: 'User',
    });
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            invitation,
        },
    });
});

export const updateStatusInvitation = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { invitationId } = req.params;
    const { status } = req.body;

    const invitationRes = await Invitation.findOne({ _id: invitationId });
    if (!invitationRes) return next(new AppError(401, 'This invitation is not belong to you'));
    if (invitationRes.status === 'Accepted') return next(new AppError(401, 'This invitation is accepted'));
    if (invitationRes.status === 'Rejected') return next(new AppError(401, 'This invitation is rejected'));

    if (invitationRes.is_invite_by === 'User') {
        const team = await Team.findOne({ team_leader: res.locals.user._id, _id: invitationRes.team });
        if (!team) return next(new AppError(401, 'This team is not belong to you'));
    }
    if (invitationRes.is_invite_by === 'Leader') {
        if (invitationRes.user.toString() !== res.locals.user._id.toString())
            return next(new AppError(401, 'This invitation is not belong to you'));
    }

    if (status === 'Accepted') {
        const pushedMemberTeam = await Team.findOneAndUpdate(
            { _id: invitationRes.team },
            { $push: { members: invitationRes.user } },
        );
        if (!pushedMemberTeam) return next(new AppError(401, 'Add the member failly'));
    }
    const invitation = await Invitation.findOneAndUpdate(
        { _id: invitationId },
        {
            status,
        },
        {
            runValidators: true,
            new: true,
        },
    );
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            invitation,
        },
    });
});

export const deleteInvitationByTeamLeader = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { invitationId } = req.params;

    const invitationRes = await Invitation.findOne({ _id: invitationId });
    if (!invitationRes) return next(new AppError(401, 'This invitation is not belong to you'));

    const isLeader = await Team.findOne({ _id: invitationRes.team, team_leader: res.locals.user._id });
    if (!isLeader) return next(new AppError(401, 'This team is not belong to you'));

    const invitation = await Invitation.findOneAndUpdate(
        { _id: invitationId },
        {
            deleteAt: new Date(Date.now()),
        },
        {
            runValidators: true,
            new: true,
        },
    );
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            invitation,
        },
    });
});

export const getInvitationByUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const invitations = await Invitation.find({ user: res.locals.user._id, status: 'Unaccepted' }).populate(
        'team user',
    );
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            invitations,
        },
    });
});

export const getInvitationByTeam = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { teamId } = req.params;
    const isLeader = await Team.findOne({ _id: teamId, team_leader: res.locals.user._id });
    if (!isLeader) return next(new AppError(401, 'This team is not belong to you'));

    const invitations = await Invitation.find({ team: teamId }).populate('team user');
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            invitations,
        },
    });
});
