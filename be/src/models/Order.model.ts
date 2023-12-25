import { Schema, model, ObjectId } from 'mongoose';
import StadiumArea from './Stadium_area.model';

export interface IOrder {
    total_cost: number;
    status: boolean;
    payment_method: string;
    bonus_points: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    user: ObjectId;
    customer_program: Array<object>;
    service: Array<object>;
    stadium_areas: Array<object>;
    find: Function;
}

const OrderSchema = new Schema<IOrder>(
    {
        total_cost: { type: Number },
        status: { type: Boolean },
        payment_method: { type: String, enum: ['Zalo', 'Momo', 'PayPal', 'Stripe', 'Cash'], required: true },
        bonus_points: { type: String },
        createAt: { type: Date, default: Date.now() },
        updateAt: { type: Date },
        deleteAt: { type: Date },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        service: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        customer_program: [
            {
                price: { type: Number },
                promotion: {
                    type: Schema.Types.ObjectId,
                    ref: 'Promotion',
                },
            },
        ],
        stadium_areas: [
            {
                start_date: { type: Date },
                end_date: { type: Date },
                price: { type: Object },
                stadium_area_ref: { type: Schema.Types.ObjectId, ref: 'StadiumArea' },
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);
OrderSchema.post('save', async function (doc, next) {
    const areaList = doc.stadium_areas.map((e: any) => e.stadium_area_ref);
    await Promise.all(
        areaList.map(async (area: string) => {
            const areaInstance = await StadiumArea.findById(area);
            if (areaInstance) {
                areaInstance.quantityOrder += 1;
                await areaInstance.save();
            }
        }),
    );

    next();
});
OrderSchema.pre(/^find/, function (next) {
    this.find({ deleteAt: undefined });

    next();
});
OrderSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date(Date.now()) });

    next();
});

const Order = model<IOrder>('Order', OrderSchema);
export default Order;
