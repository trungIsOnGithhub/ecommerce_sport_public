import mongoose, { Schema, model, ObjectId } from 'mongoose';

export interface IIntitation {
    team: ObjectId;
    user: ObjectId;
    status: string;
    message: string;
    is_invite_by: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    find: Function;
}

const invitationSchema = new Schema<IIntitation>(
    {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: [true, 'Please provide the team'],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide the user'],
        },
        status: { type: String, enum: ['Unaccepted', 'Accepted', 'Rejected'], default: 'Unaccepted' },
        message: { type: String },
        is_invite_by: { type: String, enum: ['Leader', 'User'], required: [true, 'Please provide who have invited'] },
        createAt: { type: Date, default: Date.now() },
        updateAt: { type: Date },
        deleteAt: { type: Date },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

invitationSchema.pre(/^find/, function (next) {
    this.find({ deleteAt: undefined });

    next();
});

const Invitation = model<IIntitation>('Invitation', invitationSchema);
export default Invitation;
