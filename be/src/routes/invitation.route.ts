import { Router } from 'express';

import * as authMiddlewares from '../middlewares/auth.middlewares';
import * as invivationController from '../controllers/invivation.controller';

const router = Router();

router.post('/create_invitation_by_leader', authMiddlewares.protect, invivationController.createInvitationByLeader);
router.post('/create_invitation_by_user', authMiddlewares.protect, invivationController.createInvitationByUser);

router.patch(
    '/update_status_intivation/:invitationId',
    authMiddlewares.protect,
    invivationController.updateStatusInvitation,
);

router.delete(
    '/delete_status_intivation/:invitationId',
    authMiddlewares.protect,
    invivationController.deleteInvitationByTeamLeader,
);

router.get('/get_invitations_by_user', authMiddlewares.protect, invivationController.getInvitationByUser);
router.get('/get_invitations_by_team/:teamId', authMiddlewares.protect, invivationController.getInvitationByTeam);

export default router;
