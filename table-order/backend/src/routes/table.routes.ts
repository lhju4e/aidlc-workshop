import { Router } from 'express';
import { tableController } from '../controllers/table.controller';
import { authenticate, authorize } from '../middleware/auth';
import { setupTableValidation } from '../validators/table.validator';
import { handleValidationErrors } from '../middleware/validate';

const router = Router();
router.use(authenticate, authorize('admin'));
router.post('/', setupTableValidation, handleValidationErrors, tableController.setupTable);
router.get('/', tableController.getTables);
router.post('/:id/complete', tableController.completeTable);
router.get('/:id/history', tableController.getHistory);

export default router;
