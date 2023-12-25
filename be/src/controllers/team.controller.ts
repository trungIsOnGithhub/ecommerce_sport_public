import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import Team from '../models/Team.model';
import APIFeatures from '../utils/apiFeatures';
import { AppError } from '../utils/appError';
import { deleteFilesFromS3, getImagesKeyById, uploadToS3 } from '../utils/aws_s3';
import { catchAsync } from '../utils/catchAsync';

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const uploadTeamImage = upload.single('avatar');

export const createTeam = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, quantity, age, level, description, contact, members } = req.body;
    let avatar: string | undefined = undefined;

    if (req.file) {
        const { error, key } = await uploadToS3({
            file: req.file,
            keyName: `Team_${res.locals.user._id}/${uuidv4()}`,
        });
        if (error) return next(new AppError(501, 'Something went wrong S3'));
        avatar = key;
    }

    const team = await Team.create({
        name,
        quantity,
        age,
        level,
        description,
        contact,
        avatar,
        members,
        team_leader: res.locals.user._id,
    });
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            team,
        },
    });
});

export const updateTeam = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, quantity, age, level, description, contact, members } = req.body;
    const oldTeam = await Team.findOne({ _id: req.params.teamId, team_leader: res.locals.user._id });
    if (!oldTeam) return next(new AppError(501, 'Team is not belong to you'));

    let avatar: string | undefined = undefined;

    if (req.file) {
        if (oldTeam.avatar) {
            const { error: errorDelete, output } = await deleteFilesFromS3({
                keys: [new Object({ Key: oldTeam.avatar })],
            });
            if (errorDelete) return next(new AppError(501, 'Something went wrong S3'));
        }

        const { error, key } = await uploadToS3({
            file: req.file,
            keyName: `Team_${res.locals.user._id}/${uuidv4()}`,
        });
        if (error) return next(new AppError(501, 'Something went wrong S3'));
        avatar = key;
    }

    const team = await Team.findOneAndUpdate(
        { _id: req.params.teamId },
        {
            name,
            quantity,
            age,
            level,
            description,
            contact,
            avatar,
            members,
        },
        {
            new: true,
        },
    );
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            team,
        },
    });
});

export const deleteTeam = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const oldTeam = await Team.findOne({ _id: req.params.teamId, team_leader: res.locals.user._id });
    if (!oldTeam) return next(new AppError(501, 'Team is not belong to you'));

    const team = await Team.findOneAndUpdate(
        { _id: req.params.teamId },
        {
            deleteAt: new Date(Date.now()),
        },
        {
            new: true,
        },
    );
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            team,
        },
    });
});

export const getTeamsByMemberId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let teams = await Team.find({ members: res.locals.user._id, team_leader: { $ne: res.locals.user._id } }).populate([
        'members',
        'team_leader',
    ]);
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            teams,
        },
    });
});

export const getTeamsByLeaderId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const teams = await Team.find({ team_leader: res.locals.user._id }).populate(['members', 'team_leader']);
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            teams,
        },
    });
});
export const leaveTeam = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);
    // console.log(team);
    if (!team) return next(new AppError(501, 'Cannot find team'));
    if (!team.members.includes(res.locals.user._id)) return next(new AppError(501, "You didn't joined the team"));

    const filteredMember = team.members.filter((item) => item.toString() !== res.locals.user._id.toString());
    const newTeam = await Team.findOneAndUpdate({ _id: teamId }, { members: filteredMember }, { new: true });
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            team: newTeam,
        },
    });
});

export const kickedOutOfTheTeam = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { teamId } = req.params;
    const { kickedMember } = req.body;
    const team = await Team.findById(teamId);
    if (!team) return next(new AppError(501, 'Cannot find team'));

    if (!(team.team_leader.toString() === res.locals.user._id.toString()))
        return next(new AppError(501, 'You are not a team leader'));

    if (!team.members.includes(kickedMember))
        return next(new AppError(501, "the kicked member doesn't esxit in the team"));

    const filteredMember = team.members.filter((item) => item.toString() !== kickedMember.toString());

    const newTeam = await Team.findOneAndUpdate({ _id: teamId }, { members: filteredMember }, { new: true });
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            team: newTeam,
        },
    });
});

export const findTeamByName = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.query;

    const query = Team.find({ name: { $regex: name, $options: 'i' } });
    const count = await query.clone().count();
    const features = new APIFeatures(query.populate('members team_leader'), req.query).sort().limitFields().paginate();

    const teams = await features.query;
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            teams,
            count,
        },
    });
});
