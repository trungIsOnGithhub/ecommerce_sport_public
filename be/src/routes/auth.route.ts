import { Router } from 'express';

import * as authController from '../controllers/auth.controller';
// import * as authMiddlewares from '../middlewares/auth.middlewares';

const router = Router();

router.get('/signup', authController.signup);
router.post('/signin', authController.signin);
// router.patch('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword', authController.resetPassword);
// router.patch('/reqAuthOTP', authMiddlewares.protect, authController.reqAuthOTP);
// router.patch('/resAuthOTP', authMiddlewares.protect, authController.resAuthOTP);
// router.get('/current_user', authMiddlewares.protect, authController.getCurrentUser);
// router.get('/validate_phone_number', authMiddlewares.protect, authController.validatePhoneNumber);
// router.post('/is_validated_phone_number', authMiddlewares.protect, authController.isValidatedPhoneNumber);
// router.patch('/change_password', authMiddlewares.protect, authController.changePassword);

export default router;
