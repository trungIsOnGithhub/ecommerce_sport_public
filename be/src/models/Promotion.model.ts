import { Schema, model, ObjectId } from 'mongoose';
import { getUrlByKey } from '../utils/aws_s3';

export interface IPromotion {
    name: string;
    start_date: Date;
    end_date: Date;
    type: string;
    percent: number;
    quantity: number;
    money: number;
    description: string;
    image: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    user: ObjectId;
    stadium: ObjectId;
    find: Function;
}

const PromotionSchema = new Schema<IPromotion>(
    {
        name: { type: String, required: [true, 'Please tell me your promotion name'] },
        start_date: { type: Date, required: [true, 'Please tell me the start date'] },
        end_date: { type: Date, required: [true, 'Please tell me the end date'] },
        type: {
            type: String,
            enum: ['Point', 'Voucher', 'Discount'],
            required: [true, 'Please tell me the type of promotion'],
        },
        percent: { type: Number, default: 0 },
        quantity: { type: Number, default: 0 },
        money: { type: Number, default: 0 },
        description: { type: String },
        image: { type: String },
        createAt: { type: Date, default: Date.now() },
        updateAt: { type: Date },
        deleteAt: { type: Date },
        stadium: {
            type: Schema.Types.ObjectId,
            ref: 'Stadium',
            require: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);
PromotionSchema.pre('validate', function (next) {
    if (this.type === 'Voucher') {
        if (!(this.quantity && (this.percent || this.money)))
            this.invalidate('type', 'please enter quantity and percent or money');
    } else if (this.type === 'Discount') {
        if (!(this.percent || this.money)) this.invalidate('type', 'please enter percent or money');
    }
    next();
});

PromotionSchema.post('find', async function (docs, next) {
    docs = await Promise.all(
        docs.map(async (doc: any) => {
            const promotionUrl = await getUrlByKey({ key: doc.image });
            doc.image = promotionUrl.url;
        }),
    );
    next();
});

PromotionSchema.pre(/^find/, function (next) {
    this.find({ deleteAt: undefined });

    next();
});

const Promotion = model<IPromotion>('Promotion', PromotionSchema);
export default Promotion;
