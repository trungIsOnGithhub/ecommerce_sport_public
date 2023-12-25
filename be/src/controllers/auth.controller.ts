import validator from 'validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../models/User.model';
import Email from '../utils/email';
import { catchAsync } from '../utils/catchAsync';
import { createToken } from '../utils/jwt';
import { AppError } from '../utils/appError';
// import { sendOTP } from '../utils/twilio';

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const { name, email, phone, password, passwordConfirm } = req.body;
    // const user = await User.create({
    //     name,
    //     email,
    //     phone,
    //     password,
    //     passwordConfirm,
    // });

    // const token = createToken(user.id);
    // user.password = '';
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        // token,
        // data: {
        //     user,
        // },
    });
});

export const signin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!(password && username))
        return next(new AppError(StatusCodes.UNAUTHORIZED, 'Please provide username and password!'));

    const user = await User.findOne({
        $or: [
            {
                email: username,
            },
            {
                phone: username,
            },
        ],
    }).select('+password');

    if (!(user && (await user.comparePassword(password, user.password))))
        return next(new AppError(StatusCodes.UNAUTHORIZED, 'Email/ SĐT hoặc mật khẩu không chính xác'));

    const token = createToken(user?.id);
    if (user) user.password = ''; // problem
    res.status(StatusCodes.ACCEPTED).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
});

export const forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const { username } = req.body;
    // const user = await User.findOne({
    //     $or: [
    //         {
    //             email: username,
    //         },
    //         {
    //             phone: username,
    //         },
    //     ],
    // });
    // if (!user) {
    //     return next(new AppError(404, 'There is no user with email address or phone number.'));
    // }

    // const resetOTP = user.createSendOTP();
    // await user.save({ validateBeforeSave: false });

    // try {
    //     if (validator.isEmail(req.body.username)) {
    //         await new Email(user.email, resetOTP).sendPasswordReset();
    //     } else if (validator.isMobilePhone(req.body.username)) {
    //         const vn_numberPhone = user.phone.replace('0', '+84');
    //         await sendOTP(vn_numberPhone, resetOTP);
    //     }
        res.status(200).json({
            status: 'success',
            message: 'OTP was sent!',
        });
    // } catch (err) {
    //     // console.log(err);
    //     user.otp = undefined;
    //     user.otpExpires = undefined;
    //     await user.save({ validateBeforeSave: false });

    //    return next(new AppError(500, 'There was an error sending. Try again later!'));
    // }
});

export const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, otp, password, passwordConfirm } = req.body;
    const user = await User.findOne({
        $or: [
            {
                email: username,
            },
            {
                phone: username,
            },
        ],
        otp: otp,
        otpExpires: { $gt: Date.now() },
    });

    if (!user) {
        return next(new AppError(400, 'Otp is invalid or has expired'));
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    user.password = '';
    const token = createToken(user?.id);
    res.status(StatusCodes.ACCEPTED).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
});

export const getCurrentUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    res.status(StatusCodes.OK).json({
        status: 'success',
        data: user,
    });
});

// export const reqAuthOTP = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const user = await User.findById(res.locals.user._id);
//     if (!user)
//         return next(new AppError(StatusCodes.UNAUTHORIZED, 'You are not logged in! Please log in to get access.'));

//     const otp = user.createSendOTP();
//     await user.save({ validateBeforeSave: false });

//     try {
//         const vn_numberPhone = user.phone.replace('0', '+84');
//         await sendOTP(vn_numberPhone, otp);
//         res.status(200).json({
//             status: 'success',
//             message: 'OTP sent to your phone!',
//         });
//     } catch (error) {
//         // console.log(error);
//         user.otp = undefined;
//         user.otpExpires = undefined;
//         await user.save({ validateBeforeSave: false });

//         return next(new AppError(500, 'There was an error sending the phone. Try again later!'));
//     }
// });

// export const resAuthOTP = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const { otp } = req.body;
//     const user = await User.findOne({
//         _id: res.locals.user._id,
//         otp,
//         otpExpires: { $gt: Date.now() },
//     });
//     if (!user) {
//         return next(new AppError(400, 'OTP is invalid or has expired'));
//     }
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     user.isRealPhone = true;
//     await user.save({ validateBeforeSave: false });

//     res.status(StatusCodes.ACCEPTED).json({
//         status: 'success',
//         message: 'Your phone number is verified',
//     });
// });

// export const validatePhoneNumber = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const user = await User.findById(res.locals.user._id);
//     if (!user) return next(new AppError(400, 'User is not esxit'));

//     const otp = user.createSendOTP();
//     await user.save({ validateBeforeSave: false });

//     try {
//         const vn_numberPhone = user.phone.replace('0', '+84');
//         await sendOTP(vn_numberPhone, otp);

//         res.status(200).json({
//             status: 'success',
//             message: 'Create OTP successfull',
//         });
//     } catch (error) {
//         // console.log(error);
//         user.otp = undefined;
//         user.otpExpires = undefined;
//         await user.save({ validateBeforeSave: false });

//         return next(new AppError(500, 'There was an error sending the phone number. Try again later!'));
//     }
// });

// export const isValidatedPhoneNumber = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const user = await User.findOne({ _id: res.locals.user._id, otp: req.body.otp, otpExpires: { $gt: Date.now() } });
//     if (!user) return next(new AppError(400, 'OTP is incorrrect'));
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     user.isRealPhone = true;
//     await user.save({ validateBeforeSave: false });
//     res.status(200).json({
//         status: 'success',
//         message: 'Validate successfull',
//     });
// });

export const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword, newConfirmPassword } = req.body;
    const user = await User.findById(res.locals.user._id).select('+password');
    if (!(user && (await user.comparePassword(currentPassword, user.password))))
        return next(new AppError(StatusCodes.UNAUTHORIZED, 'Email/ SĐT hoặc mật khẩu không chính xác'));

    user.password = newPassword;
    user.passwordConfirm = newConfirmPassword;
    await user.save();

    user.password = '';
    const token = createToken(user?.id);
    res.status(StatusCodes.ACCEPTED).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
});
