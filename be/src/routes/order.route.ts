import { Router } from 'express';

import * as authMiddlewares from '../middlewares/auth.middlewares';
import * as orderController from '../controllers/order.controller';

const router = Router();

router.post('/create', authMiddlewares.protect, orderController.createOrder);
router.get('/get_schedule_area', orderController.getScheduleArea);
router.get(
    '/get_schedule_week_by_date',
    //authMiddlewares.protect,
    //authMiddlewares.restrictTo('own', 'admin'),
    orderController.getScheduleDuringWeek,
);
router.get(
    '/get_order_by_ids',
    //authMiddlewares.protect,
    //authMiddlewares.restrictTo('own', 'admin'),
    orderController.getOrderByIds,
);

router.get('/get_schedule_by_user', authMiddlewares.protect, orderController.getScheduleByUser);

router.get('/get_checkout_session', authMiddlewares.protect, orderController.getCheckoutSession);
router.post('/update_payment_successful', authMiddlewares.protect, orderController.updatePaymentSuccessful);
router.get('/get_orders_by_area', orderController.getOrdersByArea);
router.put(
    '/update_status_payment/:orderId',
    //authMiddlewares.protect,
    //authMiddlewares.restrictTo('own', 'admin'),
    orderController.updateStatusPayment,
);
router.delete(
    '/delete_order/:orderId',
    //authMiddlewares.protect,
    //authMiddlewares.restrictTo('own', 'admin'),
    orderController.deleteOrder,
);
router.get('/stat_top_order', orderController.statTopOrder);
router.get('/get_order_by_user', authMiddlewares.protect, orderController.getOrderByUser);

router.get(
    '/get_stat_monthly',
    //authMiddlewares.protect,
    //authMiddlewares.restrictTo('own', 'admin'),
    orderController.getStatMonthly,
);

export default router;
