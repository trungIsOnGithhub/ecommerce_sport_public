import { Router } from 'express';

import * as authMiddlewares from '../middlewares/auth.middlewares';
import * as promotionController from '../controllers/promotion.controller';

const router = Router();

router.post(
    '/create_promotion',
    authMiddlewares.protect,
    authMiddlewares.restrictTo('own', 'admin'),
    promotionController.uploadPromotionImage,
    promotionController.createPromotion,
);

router.patch(
    '/update_promotion/:promotionId',
    authMiddlewares.protect,
    authMiddlewares.restrictTo('own', 'admin'),
    promotionController.uploadPromotionImage,
    promotionController.upadatePromotion,
);

router.delete(
    '/delete_promotion/:promotionId',
    authMiddlewares.protect,
    authMiddlewares.restrictTo('own', 'admin'),
    promotionController.deletePromotion,
);

router.get('/get_promotions_of_owner', authMiddlewares.protect, promotionController.getPromotionsOfStadium);
router.get('/get_promotions_by_std', promotionController.getPromotionsByStd);

export default router;
