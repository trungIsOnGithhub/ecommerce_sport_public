import mongoose, { Schema, model, ObjectId } from 'mongoose';
import { getUrlByKey } from '../utils/aws_s3';

export interface ITeam {
    name: string;
    avatar: string;
    quantity: number;
    age: number;
    level: string;
    description: string;
    contact: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    core_stadium: ObjectId;
    members: ObjectId[];
    team_leader: ObjectId;
    find: Function;
}

const teamSchema = new Schema<ITeam>(
    {
        name: {
            type: String,
            required: [true, 'Please provide a valid name'],
        },
        avatar: { type: String },
        quantity: { type: Number, default: 0 },
        age: { type: Number, default: 0 },
        level: { type: String, enum: ['Chuyên nghiệp', 'Cao cấp', 'Trung bình', 'Nghiệp dư'] },
        description: { type: String },
        contact: { type: String },
        createAt: { type: Date, default: Date.now() },
        updateAt: Date,
        deleteAt: Date,
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        team_leader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide the team leader'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

teamSchema.post('find', async function (docs, next) {
    docs = await Promise.all(
        docs.map(async (doc: any) => {
            const promotionUrl = await getUrlByKey({ key: doc.avatar });
            doc.avatar = promotionUrl.url;
        }),
    );
    next();
});

teamSchema.pre(/^find/, function (next) {
    this.find({ deleteAt: undefined });

    next();
});

teamSchema.pre('save', function (next) {
    if (!this.members.includes(this.team_leader)) {
        this.members.push(this.team_leader);
    }

    next();
});

const Team = model<ITeam>('Team', teamSchema);
export default Team;
