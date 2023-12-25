import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import Stadium from '../models/Stadium.model';
import APIFeatures from '../utils/apiFeatures';
import { AppError } from '../utils/appError';
import { deleteFilesFromS3, getImagesKeyById, uploadToS3 } from '../utils/aws_s3';
import { catchAsync } from '../utils/catchAsync';

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const uploadStadiumImages = upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'images', maxCount: 20 },
]);

export const create_stadium = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, contact, rules, time_open, time_close, location } = req.body;
    let avatar: string | undefined = undefined;
    let images: string[] | undefined = undefined;
    const owner_id = res.locals.user._id;

    const files = req.files as any;
    if (files?.avatar) {
        const { error, key } = await uploadToS3({ file: files.avatar[0], keyName: `${owner_id}/avatar_${uuidv4()}` });
        if (error) return next(new AppError(501, 'Something went wrong S3'));
        avatar = key;
    }
    if (files?.images) {
        try {
            const arrKey = await Promise.all(
                files.images.map((image: any) => {
                    return uploadToS3({ file: image, keyName: `${owner_id}/stadium_${uuidv4()}` });
                }),
            );
            images = arrKey.map((e) => e.key);
        } catch (error) {
            return next(new AppError(501, 'Something went wrong S3'));
        }
    }

    const stadium = await Stadium.create({
        name,
        description,
        contact,
        rules,
        time_open,
        time_close,
        location,
        avatar,
        images,
        user: owner_id,
    });
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            stadium,
        },
    });
});

export const update_stadium = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const stad_id = req.params.id;
    const { name, description, contact, rules, time_open, time_close, location } = req.body;

    // handles files
    let avatar: string | undefined = undefined;
    let images: string[] | undefined = undefined;

    const stadidum_old = await Stadium.findOne({ _id: stad_id });
    if (!stadidum_old) return next(new AppError(401, 'Stadium is not found'));
    const files = req.files as any;
    if (files?.avatar) {
        //Delete old files
        if (stadidum_old.avatar) {
            const { error: errorDelete, output } = await deleteFilesFromS3({
                keys: [new Object({ Key: stadidum_old.avatar })],
            });
            if (errorDelete) return next(new AppError(501, 'Something went wrong S3'));
        }

        const { error: errorUpload, key } = await uploadToS3({
            file: files.avatar[0],
            keyName: `${res.locals.user._id}/avatar_${uuidv4()}`,
        });
        if (errorUpload) return next(new AppError(501, 'Something went wrong S3'));
        avatar = key;
    }
    if (files?.images) {
        //Delete old files
        const keys = stadidum_old.images;
        if (keys.length !== 0) {
            const keyObj = keys?.map((key) => new Object({ Key: key })) || [];
            const { error, output } = await deleteFilesFromS3({ keys: keyObj });
            if (error) return next(new AppError(501, 'Something went wrong S3 (delete)'));
        }

        try {
            const arrKey = await Promise.all(
                files.images.map((image: any) => {
                    return uploadToS3({ file: image, keyName: `${res.locals.user._id}/stadium_${uuidv4()}` });
                }),
            );
            images = arrKey.map((e) => e.key);
        } catch (error) {
            return next(new AppError(501, 'Something went wrong S3 (upload)'));
        }
    }

    const stadium = await Stadium.findOneAndUpdate(
        { _id: stad_id },
        {
            name,
            description,
            contact,
            rules,
            time_open,
            time_close,
            location,
            avatar,
            images,
        },
        {
            new: true,
            runValidators: true,
        },
    );
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            stadium,
        },
    });
});

export const search_stadium = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, provinceId, districtId, wardId, funds } = req.query;
    const search_query = {} as any;
    if (name) search_query['name'] = { $regex: name, $options: 'i' };
    if (wardId) search_query['location.ward.code'] = { $regex: wardId };
    if (districtId) search_query['location.district.code'] = { $regex: districtId };
    if (provinceId) search_query['location.province.code'] = { $regex: provinceId };
    if (funds) {
        search_query['$or'] = [];
        const min = Number(JSON.parse(funds as string).min);
        const max = Number(JSON.parse(funds as string).max);
        search_query.$or.push({ 'funds.min': { $gte: min, $lte: max } });
        search_query.$or.push({ 'funds.max': { $gte: min, $lte: max } });
    }
    const query = Stadium.find(search_query);
    const count = await query.clone().count();
    const features = new APIFeatures(query.populate('quantityOrder promotions'), req.query)
        .sort()
        .limitFields()
        .paginate();

    const stadiums = await features.query;
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            stadiums,
            count,
        },
    });
});

export const getStadium = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const stadium = await Stadium.find({ slug: req.params.slug }).populate('user');

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            stadium,
        },
    });
});

export const getStadiumOfOwner = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const stadiums = await Stadium.find({ user: res.locals.user._id });

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: {
            stadiums,
        },
    });
});

export const deleteStadium = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await Stadium.findOneAndUpdate(
        { user: res.locals.user._id, _id: req.params.id },
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
