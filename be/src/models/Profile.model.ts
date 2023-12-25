import mongoose, { Schema, model, ObjectId } from 'mongoose';

export interface IProfile {
    role: string;
    dominant_foot: string;
    power: number;
    physical: number;
    speed: number;
    skillfull: number;
    reflex: number;
    calm: number;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    user: ObjectId;
    find: Function;
}

const profileSchema = new Schema<IProfile>(
    {
        role: String,
        dominant_foot: String,
        power: Number,
        physical: Number,
        speed: Number,
        skillfull: Number,
        reflex: Number,
        calm: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide the owner'],
        },
        createAt: { type: Date, default: Date.now() },
        updateAt: Date,
        deleteAt: Date,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

profileSchema.pre(/^find/, function (next) {
    this.find({ deleteAt: undefined });

    next();
});

const Profile = model<IProfile>('Profile', profileSchema);
export default Profile;
