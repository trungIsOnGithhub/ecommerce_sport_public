import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import { randomOTP } from '../utils/helper';
import { getUrlByKey } from '../utils/aws_s3';

export interface IUser {
    name: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirm: string;
    dateOfBirth: Date;
    gender: string;
    address: string;
    photo: string;
    role: string;
    points: number;
    isRealPhone: boolean;
    passwordChangedAt: Date;
    otp: Number | undefined;
    otpExpires: number | undefined;
    comparePassword: Function;
    changedPasswordAfter: Function;
    createPasswordResetToken: Function;
    createSendOTP: Function;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, default: '' },
        email: {
            type: String,
            required: [true, 'Please provide a valid email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },
        phone: {
            type: String,
            required: [true, 'Please provide a valid phone'],
            unique: true,
            lowercase: true,
            validate: [validator.isMobilePhone, 'Please provide a valid phone'],
        },
        password: {
            type: String,
            required: [true, 'Please tell me your password'],
            minlength: 8,
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            minlength: 8,
            select: false,
        },
        dateOfBirth: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ['Male', 'female'],
        },
        points: {
            type: Number,
        },
        address: {
            type: String,
        },
        photo: {
            type: String,
            default: 'default.jpg',
        },
        role: {
            type: String,
            enum: ['user', 'own', 'admin'],
            default: 'user',
        },
        isRealPhone: {
            type: Boolean,
            default: false,
        },
        passwordChangedAt: Date,
        otp: Number,
        otpExpires: Number,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

userSchema.pre('validate', function (next) {
    if (this.password !== this.passwordConfirm) {
        this.invalidate('passwordConfirm', 'enter the same password');
    }
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = '';

    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
});

userSchema.methods.comparePassword = async function (password: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number): boolean {
    const passwordChangedAt = this.passwordChangedAt as Date;
    if (this.passwordChangedAt) {
        const changedTimestamp = Number(passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

userSchema.methods.createSendOTP = function () {
    const otp = randomOTP();
    this.otp = otp;
    this.otpExpires = Date.now() + 10 * 60 * 1000;
    return otp;
};
userSchema.post(/^find/, async function (doc, next) {
    const promotionUrl = await getUrlByKey({ key: doc.photo });
    doc.photo = promotionUrl.url as string;
    next();
});
const User = model<IUser>('User', userSchema);
export default User;
