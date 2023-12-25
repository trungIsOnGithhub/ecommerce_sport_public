 import mongoose, { Schema, model, ObjectId } from 'mongoose';

export interface IMatch {
    name: string;
    stadium: string;
    address: string;
    from: Date;
    to: Date;
    contact: string;
    level: string;
    description: string;
    accepted: boolean;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    myTeam: ObjectId;
    yourTeam: ObjectId;
    teamQueue: ObjectId[];
    find: Function;
}

const MatchSchema = new Schema<IMatch>(
    {
        name: String,
        stadium: String,
        address: String,
        from: { type: Date, required: true },
        to: { type: Date, required: true },
        contact: String,
        level: String,
        description: String,
        createAt: { type: Date, default: Date.now() },
        updateAt: Date,
        deleteAt: Date,
        accepted: { type: Boolean, default: false },
        myTeam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: [true, 'Please provide the team'],
        },
        yourTeam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
        teamQueue: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team',
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

MatchSchema.pre(/^find/, function (next) {
    this.find({ deleteAt: undefined });

    next();
});

const Match = model<IMatch>('Match', MatchSchema);
export default Match;
