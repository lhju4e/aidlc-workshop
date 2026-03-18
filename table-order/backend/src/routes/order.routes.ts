import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { authenticate, authorize } from '../middleware/auth';
import { createOrderValidation, updateOrderStatusValidation } from '../validators/order.validator';
import { handleValidationErrors } from '../middleware/validate';

const router = Router();
router.use(authenticate);
router.post('/', authorize('table'), createOrderValidation, handleValidationErrors, orderController.createOrder);
router.get('/', orderController.getOrders);
router.patch('/:id/status', authorize('admin'), updateOrderStatusValidation, handleValidationErrors, orderController.updateStatus);
router.delete('/:id', authorize('admin'), orderController.deleteOrder);

export default router;
