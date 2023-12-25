import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../models/User.model';
import { catchAsync } from '../utils/catchAsync';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../utils/appError';

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const bearerToken = req.headers.authorization;
    // if (!bearerToken || !bearerToken.startsWith('Bearer'))
    //     return next(new AppError(StatusCodes.UNAUTHORIZED, 'You are not logged in! Please log in to get access.'));

    // const token = bearerToken.split(' ')[1];
    // const decode = verifyToken(token);

    // if (!decode)
    //     return next(new AppError(StatusCodes.UNAUTHORIZED, 'You are not logged in! Please log in to get access.'));

    // const user = await User.findById(decode.id);
    // if (!user)
    //     return next(new AppError(StatusCodes.UNAUTHORIZED, 'The user belonging to this token does no longer exist.'));
    // if (user.changedPasswordAfter(decode.iat))
    //     return next(new AppError(StatusCodes.UNAUTHORIZED, 'User recently changed password! Please log in again.'));

    // res.locals.user = user;
    next();
});

export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
    //     if (!roles.includes(res.locals.user.role)) {
    //         return next(new AppError(403, 'You do not have permission to perform this action'));
    //     }

        next();
    };
};
