import { Router } from 'express';

import * as authMiddlewares from '../middlewares/auth.middlewares';
import * as matchController from '../controllers/match.controller';

const router = Router();

router.post('/create_match', authMiddlewares.protect, matchController.createMatch);
router.delete('/delete_match/:match_id', authMiddlewares.protect, matchController.deleteMatch);
router.get('/get_matchs_without_assign', matchController.getAllMatchWithoutAssignTeam);
router.get('/get_own_matchs', authMiddlewares.protect, matchController.getAllMatchOfOwn);
router.post('/assign_match_queue', authMiddlewares.protect, matchController.assignTeamQueue);
router.patch('/accept_assign_team/:matchId', authMiddlewares.protect, matchController.acceptAssignTeam);
router.get('/get_matchs_by_team_id', matchController.getMatchsByTeamId);

export default router;
