import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../utils/catchAsync';
import Match from '../models/Match';
import Team from '../models/Team.model';
import { AppError } from '../utils/appError';

export const createMatch = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const team = await Team.findOne({ _id: req.body.myTeam, team_leader: res.locals.user._id });
    if (!team) return next(new AppError(401, 'Team is not exsit'));

    const match = await Match.create(req.body);
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            match,
        },
    });
});

export const deleteMatch = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const match = await Match.findOne({ _id: req.params.match_id });
    if (!match) return next(new AppError(401, 'Match is not exsit'));

    const team = await Team.findOne({ _id: match.myTeam, team_leader: res.locals.user._id });
    if (!team) return next(new AppError(401, 'Team is not exsit'));

    await Match.findOneAndUpdate({ _id: match._id }, { deleteAt: new Date(Date.now()) });

    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Delete successfull',
    });
});

export const getAllMatchWithoutAssignTeam = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const matchs = await Match.find({ yourTeam: undefined }).populate('myTeam yourTeam teamQueue');

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: matchs,
    });
});

export const getMatchsByTeamId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const matchs = await Match.find({ myTeam: req.query.teamId }).populate('myTeam yourTeam teamQueue');

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: matchs,
    });
});

export const getAllMatchOfOwn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const myTeams = await Team.find({ team_leader: res.locals.user._id });
    const matchs = await Match.find()
        .where('myTeam')
        .in(myTeams.map((e) => e._id.toString()))
        .populate('myTeam yourTeam teamQueue');

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: matchs,
    });
});

export const assignTeamQueue = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { myTeam, matchId } = req.body;

    const team = await Team.findOne({ _id: myTeam, team_leader: res.locals.user._id });
    if (!team) return next(new AppError(401, 'Team is not exist'));

    const match = await Match.findById(matchId);
    if (!match) return next(new AppError(401, 'Match is not exist'));

    await Match.findOneAndUpdate({ _id: match._id }, { $push: { teamQueue: myTeam } });
    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Assign team queue successfull',
    });
});

export const acceptAssignTeam = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { matchId } = req.params;
    const { acceptTeam } = req.body;
    console.log(matchId, acceptTeam);

    const match = await Match.findById(matchId);
    if (!match) return next(new AppError(401, 'Match is not exsit'));

    const team = await Team.findOne({ _id: match.myTeam, team_leader: res.locals.user._id });
    if (!team) return next(new AppError(401, 'Team is not exsit'));

    const newMatch = await Match.findOneAndUpdate(
        { _id: match._id },
        {
            accepted: true,
            yourTeam: acceptTeam,
        },
        { new: true },
    );
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: newMatch,
    });
});
