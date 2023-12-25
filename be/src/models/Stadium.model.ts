import mongoose, { Schema, model, ObjectId } from 'mongoose';
import { getUrlByKey } from '../utils/aws_s3';
import slugify from 'slugify';
import { IStadiumArea } from './Stadium_area.model';
import Order from './Order.model';

export interface IStadium {
    name: string;
    contact: string;
    description: string;
    rules: string;
    time_open: string;
    time_close: string;
    location: object;
    avatar: string;
    images: string[];
    funds: object;
    slug: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    user: ObjectId;
    find: Function;
}

const stadiumSchema = new Schema<IStadium>(
    {
        name: { type: String, required: [true, 'Please tell me your stadium name'] },
        contact: { type: String, required: true },
        description: { type: String },
        rules: { type: String },
        time_open: { type: String },
        time_close: { type: String },
        location: {
            province: {
                code: { type: String, required: true },
                name: { type: String, required: true },
            },
            district: {
                code: { type: String, required: true },
                name: { type: String, required: true },
            },
            ward: {
                code: { type: String, required: true },
                name: { type: String, required: true },
            },
            address: { type: String, required: true },
        },
        avatar: { type: String },
        images: [{ type: String }],
        slug: { type: String },
        funds: {
            min: { type: Number },
            max: { type: Number },
        },
        createAt: { type: Date, default: Date.now() },
        updateAt: { type: Date },
        deleteAt: { type: Date },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide the owner'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

stadiumSchema
    .virtual('quantityOrder', {
        ref: 'StadiumArea',
        foreignField: 'stadium',
        localField: '_id',
    })
    .get(function (areas) {
        return areas?.reduce((curr: number, area: any) => {
            return curr + area.quantityOrder;
        }, 0);
    });

stadiumSchema
    .virtual('promotions', {
        ref: 'Promotion',
        foreignField: 'stadium',
        localField: '_id',
    })
    .get(function (promotions) {
        const promotionList: any[] = [];
        promotions?.forEach((promotion: any) => {
            if (promotion.start_date < new Date(Date.now()) && promotion.end_date > new Date(Date.now()))
                promotionList.push(promotion._id);
        });
        return promotionList;
    });

stadiumSchema.pre('save', function (next) {
    this.slug = slugify(this.name, '_');
    next();
});

stadiumSchema.pre(/Update$/, function (next) {
    this.set({ updatedAt: new Date(Date.now()) });

    next();
});
stadiumSchema.pre(/^find/, function (next) {
    this.find({ deleteAt: undefined });

    next();
});
stadiumSchema.post('find', async function (docs, next) {
    docs = await Promise.all(
        docs.map(async (doc: any) => {
            const avatarUrl = await getUrlByKey({ key: doc.avatar });
            doc.avatar = avatarUrl.url;
            const imageUrls = await Promise.all(doc.images.map((image: any) => getUrlByKey({ key: image })));
            doc.images = imageUrls.map((imageUrl) => imageUrl.url);
        }),
    );
    next();
});

stadiumSchema.post('findOneAndUpdate', async function (doc, next) {
    const avatarUrl = await getUrlByKey({ key: doc.avatar });
    doc.avatar = avatarUrl.url;
    const imageUrls = await Promise.all(doc.images.map((image: any) => getUrlByKey({ key: image })));
    doc.images = imageUrls.map((imageUrl) => imageUrl.url);
    next();
});

const Stadium = model<IStadium>('Stadium', stadiumSchema);
export default Stadium;
