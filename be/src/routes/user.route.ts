import { Router } from 'express';

import * as authMiddlewares from '../middlewares/auth.middlewares';
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/get_user', authMiddlewares.protect, userController.getAllUser);
router.patch('/update_user', authMiddlewares.protect, userController.uploadAvatar, userController.updateUser);
router.get('/get_user_by_phone/:phone', authMiddlewares.protect, userController.getUserByPhone);
router.get('/get_users', userController.findUsers);
router.get('/get_user_by_id', userController.findUserById);

export default router;
