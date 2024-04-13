import express from 'express';
import * as activityController from '../controllers/activity.controller';
import { authenticateToken } from '../config/auth.middleware';

const router = express.Router();

router.get('/',authenticateToken, activityController.getAllActivities);
router.get('/:id',authenticateToken, activityController.getActivityById);
router.post('/',authenticateToken, activityController.createActivity);
router.put('/:id',authenticateToken, activityController.updateActivity);
router.delete('/:id',authenticateToken, activityController.deleteActivity);

export default router;
