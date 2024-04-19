import express from 'express';
import * as dasboardController from '../controllers/dashboard.controller';
import { authenticateToken } from '../config/auth.middleware';

const router = express.Router();

router.get('/',authenticateToken, dasboardController.getData);

export default router;
