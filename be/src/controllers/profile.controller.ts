import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/User.model';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import multer from 'multer';
import { deleteFilesFromS3, uploadToS3 } from '../utils/aws_s3';
import Profile from '../models/Profile.model';

export const updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let profile = await Profile.findOne({ user: res.locals.user._id });
    if (!profile) profile = await Profile.create({ ...req.body, user: res.locals.user._id });
    else {
        profile = await Profile.findOneAndUpdate({ user: res.locals.user._id }, req.body);
    }

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

export const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const profile = await Profile.findOne({ user: res.locals.user._id });

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            profile,
        },
    });
});

export const getProfileByUserId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query;
    const profile = await Profile.findOne({ user: userId });

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            profile,
        },
    });
});
