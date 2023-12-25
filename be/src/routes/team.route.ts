import { Router } from 'express';

import * as authMiddlewares from '../middlewares/auth.middlewares';
import * as teamController from '../controllers/team.controller';

const router = Router();

router.post('/create_team', authMiddlewares.protect, teamController.uploadTeamImage, teamController.createTeam);

router.patch(
    '/update_team/:teamId',
    authMiddlewares.protect,
    teamController.uploadTeamImage,
    teamController.updateTeam,
);

router.delete('/delete_team/:teamId', authMiddlewares.protect, teamController.deleteTeam);

router.get('/get_teams_by_member_id', authMiddlewares.protect, teamController.getTeamsByMemberId);
router.get('/get_teams_by_leader_id', authMiddlewares.protect, teamController.getTeamsByLeaderId);
router.patch('/leave_team/:teamId', authMiddlewares.protect, teamController.leaveTeam);
router.patch('/kick_out_member/:teamId', authMiddlewares.protect, teamController.kickedOutOfTheTeam);
router.get('/get_teams_by_name', teamController.findTeamByName);

export default router;
