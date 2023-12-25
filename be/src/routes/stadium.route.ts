import { Router } from 'express';

import * as authMiddlewares from '../middlewares/auth.middlewares';
import * as stadiumController from '../controllers/stadium.controller';

const router = Router();

router.post(
    '/create',
    authMiddlewares.protect,
    authMiddlewares.restrictTo('own', 'admin'),
    stadiumController.uploadStadiumImages,
    stadiumController.create_stadium,
);

router.put(
    '/update/:id',
    authMiddlewares.protect,
    authMiddlewares.restrictTo('own', 'admin'),
    stadiumController.uploadStadiumImages,
    stadiumController.update_stadium,
);
router.get(
    '/owner',
    authMiddlewares.protect,
    authMiddlewares.restrictTo('own', 'admin'),
    stadiumController.getStadiumOfOwner,
);

router.get('/search', stadiumController.search_stadium);
router.get('/:slug', stadiumController.getStadium);
router.delete(
    '/:id',
    authMiddlewares.protect,
    authMiddlewares.restrictTo('own', 'admin'),
    stadiumController.deleteStadium,
);

export default router;
