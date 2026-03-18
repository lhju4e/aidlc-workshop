import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller';
import { authenticate, authorize } from '../middleware/auth';
import { updatePaymentValidation } from '../validators/payment.validator';
import { handleValidationErrors } from '../middleware/validate';

const router = Router();
router.use(authenticate, authorize('admin'));
router.get('/', paymentController.getPayments);
router.patch('/:orderId', updatePaymentValidation, handleValidationErrors, paymentController.updateStatus);

export default router;
