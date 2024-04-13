import express from 'express';
import * as fieldController from '../controllers/field.controller';
import { authenticateToken } from '../config/auth.middleware';

const router = express.Router();

router.get('/',authenticateToken, fieldController.getAllFields);
router.get('/:id',authenticateToken, fieldController.getFieldById);
router.post('/',authenticateToken, fieldController.createField);
router.put('/:id',authenticateToken, fieldController.updateField);
router.delete('/:id',authenticateToken, fieldController.deleteField);

export default router;
