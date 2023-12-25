import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/User.model';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import multer from 'multer';
import { deleteFilesFromS3, uploadToS3 } from '../utils/aws_s3';
import APIFeatures from '../utils/apiFeatures';

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const uploadAvatar = upload.single('photo');

export const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            users,
        },
    });
});

export const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, dateOfBirth, gender, address } = req.body;

    let photo;
    if (req.file) {
        if (res.locals.user.photo) {
            const { error: errorDelete, output } = await deleteFilesFromS3({
                keys: [new Object({ Key: res.locals.user.photo })],
            });
            if (errorDelete) return next(new AppError(501, 'Something went wrong S3'));
        }

        const { error, key } = await uploadToS3({
            file: req.file,
            keyName: `${res.locals.user._id}/photo_${uuidv4()}`,
        });
        if (error) return next(new AppError(501, 'Something went wrong S3'));
        photo = key;
    }

    const user = await User.findOneAndUpdate(
        { _id: res.locals.user._id },
        { name, dateOfBirth, gender, address, photo },
    );
    if (!user) return next(new AppError(400, 'Update failly'));

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            user,
        },
    });
});

export const getUserByPhone = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.params;
    const user = await User.findOne({ phone: phone });

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            user,
        },
    });
});

export const findUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, phone } = req.query;
    const findQueryArr = [];
    if (name) findQueryArr.push({ name: { $regex: name, $options: 'i' } });
    if (phone) findQueryArr.push({ phone: { $regex: phone, $options: 'i' } });
    const query = User.find({
        $or: findQueryArr,
    }).select('name email phone photo address gender dateOfBirth');
    const count = await query.clone().count();
    const features = new APIFeatures(query, req.query).sort().limitFields().paginate();

    const users = await features.query;
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            users,
            count,
        },
    });
});

export const findUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.query.id).select('name email phone photo address gender dateOfBirth');
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            user,
        },
    });
});
