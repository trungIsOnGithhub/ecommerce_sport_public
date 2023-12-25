import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../utils/appError';

interface ErrorResponse {
    statusCode: number;
    status: string;
    message: string;
}

const handleValidationError = (err: Error): ErrorResponse => {
    const errAny: any = err;
    const errs = (err as any) && Object.values(errAny.errors).map((el: any) => el.message);
    return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: 'error',
        message: `Invalid input data. ${errs.join('. ')}`,
    };
};
const handleMongoServerError = (err: Error): ErrorResponse => {
    return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: 'error',
        message: err.message,
    };
};

const handleJsonWebTokenError = (err: Error): ErrorResponse => {
    return {
        statusCode: StatusCodes.UNAUTHORIZED,
        status: 'fail',
        message: 'You are not logged in or invalid token! Please log in to get access.',
    };
};

export const ErrorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    // console.log(err.name + ': ' + err.message);
    // console.log(err);
    let errRes: ErrorResponse = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        status: 'error',
        message: 'Something went very wrong!',
    };

    // handle error
    if (err instanceof AppError) {
        errRes = { ...errRes, ...err, message: err.message };
    } else {
        if (err.name === 'ValidationError') errRes = handleValidationError(err);
        if (err.name === 'MongoServerError') errRes = handleMongoServerError(err);
        if (err.name === 'JsonWebTokenError') errRes = handleJsonWebTokenError(err);
    }

    // response error
    return res.status(errRes.statusCode).json({
        status: errRes.status,
        message: errRes.message,
    });
};
