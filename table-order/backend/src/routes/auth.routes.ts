import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { registerValidation, adminLoginValidation, tableLoginValidation } from '../validators/auth.validator';
import { handleValidationErrors } from '../middleware/validate';

const router = Router();
router.post('/register', registerValidation, handleValidationErrors, authController.register);
router.post('/admin/login', adminLoginValidation, handleValidationErrors, authController.adminLogin);
router.post('/table/login', tableLoginValidation, handleValidationErrors, authController.tableLogin);

export default router;
