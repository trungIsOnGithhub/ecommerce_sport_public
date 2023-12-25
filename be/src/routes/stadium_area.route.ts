import { Router } from 'express';

import * as authMiddlewares from '../middlewares/auth.middlewares';
import * as stadiumAreaController from '../controllers/stadium_area.controller';

const router = Router();

router.post(
    '/create/:stadium',
    authMiddlewares.protect,
    authMiddlewares.restrictTo('own', 'admin'),
    stadiumAreaController.createArea,
);
router.put(
    '/update/:stadium/:area',
    authMiddlewares.protect,
    authMiddlewares.restrictTo('own', 'admin'),
    stadiumAreaController.updateArea,
);
router.delete(
    '/delete/:stadium/:area',
    authMiddlewares.protect,
    authMiddlewares.restrictTo('own', 'admin'),
    stadiumAreaController.deleteArea,
);
router.get('/:id/get_all_area_stadium', stadiumAreaController.getAllAreaOfStadium);

export default router;
