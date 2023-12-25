import { Schema, model, ObjectId } from 'mongoose';
import Stadium from './Stadium.model';

export interface IStadiumArea {
    name: string;
    size: string;
    quantity: number;
    description: string;
    type: string;
    status: string;
    time_price: Array<object>;
    extra_infor: Array<object>;
    default_price: Number;
    quantityOrder: number;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    stadium: ObjectId;
    find: Function;
    clone: Function;
}

const stadiumAreaSchema = new Schema<IStadiumArea>(
    {
        name: { type: String, required: true, unique: true },
        size: { type: String },
        quantity: { type: Number, required: true },
        description: { type: String },
        type: { type: String },
        status: { type: String },
        default_price: { type: Number, required: true },
        time_price: [
            {
                from: {
                    type: Number,
                    require: true,
                },
                to: {
                    type: Number,
                    require: true,
                },
                price: {
                    type: Number,
                    require: true,
                },
            },
        ],
        extra_infor: [
            {
                key: {
                    type: String,
                },
                value: {
                    type: String,
                },
            },
        ],
        createAt: { type: Date, default: Date.now() },
        updateAt: { type: Date },
        deleteAt: { type: Date },
        quantityOrder: { type: Number, default: 0 },
        stadium: {
            type: Schema.Types.ObjectId,
            ref: 'Stadium',
            require: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);
stadiumAreaSchema.pre(/^find/, function (next) {
    this.find({ deleteAt: undefined });

    next();
});
stadiumAreaSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date(Date.now()) });

    next();
});

const StadiumArea = model<IStadiumArea>('StadiumArea', stadiumAreaSchema);
export default StadiumArea;
