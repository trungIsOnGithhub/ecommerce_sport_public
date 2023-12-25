import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';
import Stripe from 'stripe';

import Order from '../models/Order.model';
import Stadium from '../models/Stadium.model';
import StadiumArea from '../models/Stadium_area.model';
import APIFeatures from '../utils/apiFeatures';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import Promotion from '../models/Promotion.model';
import User from '../models/User.model';

const OVER_DURATION = 24;
const NUMBER_OF_HOUR = 24;
const AFTER_SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2022-11-15',
});

function groupBy(list: any, keyGetter: any) {
    const map = new Map();
    list.forEach((item: any) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

const caculationPrice = (timeAndPrice: any[], indexHour: any, defaultPrice: any) => {
    let price = 0;
    timeAndPrice.forEach((e) => {
        if (indexHour >= e.from && indexHour < e.to) price = e.price;
    });
    return price === 0 ? defaultPrice : price;
};

const getInfoBookTime = async (id: any, startDuring: Date, endDuring: Date, mode?: string) => {
    const orderByStdQuery = {
        stadium_areas: {
            $elemMatch: {
                stadium_area_ref: id,
                start_date: { $gt: startDuring },
                end_date: { $lt: endDuring },
            },
        },
    };

    const orderByUserQuery = {
        user: id,
        stadium_areas: {
            $elemMatch: {
                start_date: { $gt: startDuring },
                end_date: { $lt: endDuring },
            },
        },
    };

    let areas = await Order.find(mode ? orderByUserQuery : orderByStdQuery)
        .select('stadium_areas')
        .populate('stadium_areas.stadium_area_ref');
    let areasSpread = [] as any;
    areas.forEach((area: any) => {
        area.stadium_areas.forEach((e: any) => {
            areasSpread.push({
                _id: area._id,
                stadium_area: { start_date: e.start_date, end_date: e.end_date },
                nameArea: e.stadium_area_ref.name,
                areaId: e.stadium_area_ref._id,
                stdId: e.stadium_area_ref.stadium,
            });
        });
    });
    areasSpread = await Promise.all(
        areasSpread.map(async (e: any) => {
            const std = await Stadium.findById(e.stdId);
            return { ...e, name: std?.name };
        }),
    );
    const groupByDays = groupBy(areasSpread, (e: any) => moment(e.stadium_area.start_date).format('DD-MM-YYYY'));
    const schedules = [] as any[];
    groupByDays.forEach((scheduleOfOneDay: any, key: any) => {
        const arrCount = [] as any[];
        for (let i = 0; i < NUMBER_OF_HOUR; i++) {
            const arrSingleCount = [] as any[];
            for (let k = 0; k < scheduleOfOneDay.length; k++) {
                const startHour = moment(scheduleOfOneDay[k].stadium_area.start_date).hour();
                const endHour = moment(scheduleOfOneDay[k].stadium_area.end_date).hour();
                if (i >= startHour && i < endHour) {
                    arrSingleCount.push(scheduleOfOneDay[k]);
                }
            }
            if (arrSingleCount.length !== 0)
                arrCount.push({ hour: i, have: arrSingleCount, count: arrSingleCount.length });
        }
        schedules.push({ date: key, schedule: arrCount });
    });
    return schedules;
};

const checkTimeExsit = (dataSchedule: any, startDate: any, endDate: any, maxSlot: any) => {
    let isExsit = true;
    dataSchedule.forEach((aSchedule: any) => {
        if (startDate.isSame(moment(aSchedule.date, 'DD-MM-YYYY'), 'day')) {
            aSchedule.schedule.forEach((sche: any) => {
                if (Number(startDate.hour()) === Number(sche.hour) && Number(sche.count) >= Number(maxSlot))
                    isExsit = false;
            });
        }
    });
    return isExsit;
};

export const createOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user._id;

    const { total_cost, stadium_areas, customer_program } = req.body;

    let totalAllCost = 0;
    // validate stadium area
    for (var areaIndex = 0; areaIndex < stadium_areas.length; areaIndex++) {
        const startDate = moment(stadium_areas[areaIndex].start_date);
        const endDate = moment(stadium_areas[areaIndex].end_date);

        // Duration is not over 24h and in a day
        const hours = endDate.diff(startDate, 'hour');
        if (hours >= OVER_DURATION && !startDate.isSame(endDate, 'day'))
            return next(new AppError(500, 'Duration is not over 24h'));

        // Check price is correct
        const area = await StadiumArea.findById(stadium_areas[areaIndex].stadium_area_ref);
        if (!area) return next(new AppError(401, 'Not found stadium area'));

        let totalPriceArea = 0;
        for (var i = startDate.hour(); i < endDate.hour(); i++) {
            totalPriceArea = totalPriceArea + caculationPrice(area.time_price, i, area.default_price);
        }

        totalAllCost = totalAllCost + totalPriceArea;

        // check order time is exsit
        const getScheduleByArea = await getInfoBookTime(
            stadium_areas[areaIndex].stadium_area_ref,
            new Date(Date.now()),
            new Date(Date.now() + AFTER_SEVEN_DAYS),
        );
        const isExsit = checkTimeExsit(getScheduleByArea, startDate, endDate, area.quantity);
        if (!isExsit) return next(new AppError(500, 'Time is over'));

        stadium_areas[areaIndex].price = area.time_price;
    }

    // check promotion
    if (customer_program) {
        for (let i = 0; i < customer_program.length; i++) {
            const promotion = await Promotion.findById(customer_program[i].promotion);
            if (!promotion) return next(new AppError(500, 'Promotion is not exsit'));
            if (promotion.type === 'Voucher') {
                const countUsedProm = await Order.find({
                    'customer_program.promotion': customer_program[i].promotion,
                }).count();
                if (promotion.quantity < countUsedProm) return next(new AppError(500, 'Promotion quantity is over'));
            }
            if (promotion.end_date < new Date(Date.now()) || promotion.start_date > new Date(Date.now()))
                return next(new AppError(500, 'Promotion time is over'));
            if (promotion.percent) totalAllCost = totalAllCost - totalAllCost * (promotion.percent / 100);
            if (promotion.money) totalAllCost = totalAllCost - promotion.money;
        }
    }
    // check total price
    if (Number(total_cost) !== totalAllCost) return next(new AppError(401, 'Total price is not exactly'));

    const order = await Order.create({ ...req.body, user: userId });
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            order,
        },
    });
});

export const getScheduleArea = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await getInfoBookTime(req.query.id, new Date(Date.now()), new Date(Date.now() + AFTER_SEVEN_DAYS));
    res.status(StatusCodes.OK).json({ data });
});

export const getScheduleDuringWeek = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const date: any = req.query.date;
    if (!date) return next(new AppError(401, 'Please provide date'));
    const dateInstance = moment(date.replace(' ', '+'));
    const dayInWeek = dateInstance.isoWeekday();
    let startWeekDay = dateInstance.clone().subtract(dayInWeek, 'days').startOf('day');
    let endWeekDay = dateInstance
        .clone()
        .add(7 - dayInWeek, 'days')
        .startOf('day');
    if (dayInWeek === 7) {
        startWeekDay = dateInstance.clone().startOf('day');
        endWeekDay = dateInstance.clone().add(7, 'days').startOf('day');
    }

    const data = await getInfoBookTime(req.query.id, startWeekDay.toDate(), endWeekDay.toDate());
    res.status(StatusCodes.OK).json({ data });
});

export const getOrderByIds = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let idsStr: string = (req.query.ids as string) || '';
    let ids: string[] = idsStr.split(',');
    const orders = await Order.find().where('_id').in(ids).populate('user stadium_areas.stadium_area_ref');
    res.status(StatusCodes.OK).json({ data: orders });
});

export const getCheckoutSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get the currently booked stadium
    const order: any = await Order.findById(req.query.id).populate('user stadium_areas.stadium_area_ref');
    if (!order) return next(new AppError(401, "Can't find order"));
    const std = await Stadium.find({ _id: order.stadium_areas[0]?.stadium_area_ref.stadium });

    const textInfo = order.stadium_areas.reduce((curr: string, data: any, index: number) => {
        return curr + `${index + 1}/ ` + data.stadium_area_ref.name + '  ';
    }, '');
    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        success_url: `${process.env.FRONTEND_URL}/booking?order_id=${req.query.id}&user=${res.locals.user._id}`,
        cancel_url: `${process.env.FRONTEND_URL}/booking`,
        customer_email: res.locals.user.email,
        client_reference_id: req.params.id,
        line_items: [
            {
                price_data: {
                    currency: 'VND',
                    product_data: {
                        name: std[0].name,
                        description: textInfo,
                        images: [std[0].avatar],
                    },
                    unit_amount: order.total_cost,
                },
                quantity: 1,
            },
        ],
    });

    // 3) Create session as response
    res.status(200).json({
        status: 'success',
        session,
    });
});

export const updatePaymentSuccessful = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { order_id, user } = req.body;
    if (user !== res.locals.user._id.toString()) return next(new AppError(401, 'User is incorrect'));

    await Order.findOneAndUpdate({ _id: order_id, user: user }, { status: true });

    res.status(200).json({
        status: 'success',
        message: 'Update successfull',
    });
});
export const getOrdersByArea = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { area_id, search } = req.query;
    if (!area_id) return next(new AppError(401, 'area_id is incorrect'));
    const search_query = Order.find({ 'stadium_areas.stadium_area_ref': area_id });
    if (search) {
        const users = await User.find({
            $or: [{ name: { $regex: search, $options: 'i' } }, { phone: { $regex: search, $options: 'i' } }],
        });
        const userIds = users.map((e: any) => e._id);
        search_query.where('user').in(userIds);
    }
    const count = await search_query.clone().count();

    const features = new APIFeatures(search_query.populate('stadium_areas.stadium_area_ref user'), req.query)
        .sort()
        .limitFields()
        .paginate();

    const orders = await features.query;
    res.status(200).json({
        status: 'success',
        orders,
        count,
    });
});

export const updateStatusPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return next(new AppError(401, 'order_id is incorrect'));

    order.status = req.body.status;
    order.payment_method = req.body.payment_method;
    await order.save();
    res.status(200).json({
        status: 'success',
        message: 'Payment successfull',
    });
});
export const deleteOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return next(new AppError(401, 'order_id is incorrect'));

    order.deleteAt = new Date(Date.now());
    await order.save();
    res.status(200).json({
        status: 'success',
        message: 'Delete successfull',
    });
});

export const statTopOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const stats = await Order.aggregate([
        {
            $unwind: '$stadium_areas',
        },
        {
            $group: {
                _id: '$stadium_areas.stadium_area_ref',
                count: { $sum: 1 },
            },
        },
        {
            $sort: { count: -1 },
        },
        {
            $limit: 8,
        },
    ]);
    const areaIds = stats.map((e: any) => e._id.toString());
    const stds = await StadiumArea.find().where('_id').in(areaIds).select('stadium');
    const selectedStds = await Stadium.find()
        .where('_id')
        .in(stds.map((e) => e.stadium))
        .populate('quantityOrder promotions');
    const uniqueStds = [...new Map(selectedStds.map((m: any) => [m._id, m])).values()];
    res.status(200).json({
        status: 'success',
        stds: uniqueStds,
    });
});

export const getScheduleByUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Get dates during week
    const date: any = req.query.date;
    if (!date) return next(new AppError(401, 'Please provide date'));
    const dateInstance = moment(date.replace(' ', '+'));
    const dayInWeek = dateInstance.isoWeekday();
    let startWeekDay = dateInstance.clone().subtract(dayInWeek, 'days').startOf('day');
    let endWeekDay = dateInstance
        .clone()
        .add(7 - dayInWeek, 'days')
        .startOf('day');
    if (dayInWeek === 7) {
        startWeekDay = dateInstance.clone().startOf('day');
        endWeekDay = dateInstance.clone().add(7, 'days').startOf('day');
    }

    // Get order by user
    const data = await getInfoBookTime(res.locals.user._id, startWeekDay.toDate(), endWeekDay.toDate(), 'user');
    res.status(StatusCodes.OK).json({ data });
});
export const getOrderByUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const search_query = Order.find({ user: res.locals.user._id });

    const count = await search_query.clone().count();

    const features = new APIFeatures(search_query.populate('stadium_areas.stadium_area_ref user'), req.query)
        .sort()
        .limitFields()
        .paginate();

    const orders = await features.query;
    res.status(200).json({
        status: 'success',
        orders,
        count,
    });
});

export const getStatMonthly = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { std, year } = req.query;
    const areas = await StadiumArea.find({ stadium: std });
    const areaIds = areas.map((e) => e._id);
    const stat = await Order.aggregate([
        {
            $match: {
                createAt: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
                stadium_areas: {
                    $elemMatch: {
                        stadium_area_ref: {
                            $in: areaIds,
                        },
                    },
                },
            },
        },
        {
            $group: {
                _id: { createAt: { $month: '$createAt' }, status: '$status' },
                sumTotalCost: { $sum: '$total_cost' },
                count: { $sum: 1 },
            },
        },
        {
            $addFields: { month: '$_id.createAt', status: '$_id.status' },
        },
        {
            $project: {
                _id: 0,
            },
        },
        {
            $sort: { month: 1 },
        },
    ]);
    res.status(200).json({
        status: 'success',
        stat,
    });
});
