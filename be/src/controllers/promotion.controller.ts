import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import Promotion from '../models/Promotion.model';
import Stadium from '../models/Stadium.model';
import { AppError } from '../utils/appError';
import { deleteFilesFromS3, uploadToS3 } from '../utils/aws_s3';
import { catchAsync } from '../utils/catchAsync';

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const uploadPromotionImage = upload.single('image');

export const createPromotion = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, start_date, end_date, type, description, percent, quantity, money, stadiumId } = req.body;
    const std = await Stadium.findOne({ _id: stadiumId, user: res.locals.user._id });
    if (!std) return next(new AppError(StatusCodes.CONFLICT, 'This stadium is not belong to you'));

    let image;
    if (req.file) {
        const { error, key } = await uploadToS3({
            file: req.file,
            keyName: `${res.locals.user._id}/promotion_${uuidv4()}`,
        });
        if (error) return next(new AppError(501, 'Something went wrong S3'));
        image = key;
    }
    const promotion = await Promotion.create({
        name,
        start_date,
        end_date,
        type,
        description,
        percent,
        quantity,
        money,
        image,
        stadium: stadiumId,
        user: res.locals.user._id,
    });
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: { promotion },
    });
});

export const upadatePromotion = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, start_date, end_date, type, description, percent, quantity, money, stadiumId } = req.body;
    const { promotionId } = req.params;
    const promotion = await Promotion.findOne({ _id: promotionId, user: res.locals.user._id });
    if (!promotion) return next(new AppError(StatusCodes.CONFLICT, 'You do not own this promotion'));

    let image;
    if (req.file) {
        if (promotion.image) {
            const { error: errorDelete, output } = await deleteFilesFromS3({
                keys: [new Object({ Key: promotion.image })],
            });
            if (errorDelete) return next(new AppError(501, 'Something went wrong S3'));
        }

        const { error, key } = await uploadToS3({
            file: req.file,
            keyName: `${res.locals.user._id}/promotion_${uuidv4()}`,
        });
        if (error) return next(new AppError(501, 'Something went wrong S3'));
        image = key;
    }
    const newPromotion = await Promotion.findOneAndUpdate(
        {
            _id: promotion._id,
        },
        {
            name,
            start_date,
            end_date,
            type,
            description,
            percent,
            quantity,
            money,
            image,
            stadiumId,
        },
        {
            new: true,
        },
    );
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: { newPromotion },
    });
});

export const getPromotionsOfStadium = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const promotions = await Promotion.find({ user: res.locals.user._id }).populate('stadium');
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: promotions,
    });
});

export const deletePromotion = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await Promotion.findOneAndUpdate(
        { user: res.locals.user._id, _id: req.params.promotionId },
        {
            deleteAt: new Date(Date.now()),
        },
    );

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            message: 'Delete successfull',
        },
    });
});

export const getPromotionsByStd = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const promotions = await Promotion.find({ stadium: req.query.stdId, end_date: { $gt: new Date(Date.now()) } });
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: promotions,
    });
});
