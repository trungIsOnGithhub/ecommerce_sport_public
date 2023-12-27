let mongoose = require('mongoose')
// let Schema = mongoose.Schema,
//     ObjectId = Schema.ObjectId,

var Schema = new mongoose.Schema({
    name: string,
    email: string,
    phone: string,
    password: string,
    passwordConfirm: string,
    dateOfBirth: Date,
    gender: string,
    address: string,
    photo: string,
    role: string,
    points: number,
    isRealPhone: boolean,
    passwordChangedAt: Date,
    otp: Number | undefined,
    otpExpires: number | undefined,
    comparePassword: Function,
    changedPasswordAfter: Function,
    createPasswordResetToken: Function,
    createSendOTP: Function,
})

module.exports = mongoose.model('Category', Schema)