import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

export default router;
