import { Router } from 'express';

import * as authMiddlewares from '../middlewares/auth.middlewares';
import * as profileController from '../controllers/profile.controller';

const router = Router();

router.patch('/update_profile', authMiddlewares.protect, profileController.updateProfile);
router.get('/get_my_profile', authMiddlewares.protect, profileController.getMyProfile);
router.get('/get_profile_by_userid', profileController.getProfileByUserId);

export default router;
