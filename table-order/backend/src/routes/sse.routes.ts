import { Router } from 'express';
import { sseController } from '../controllers/sse.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
router.get('/orders', authenticate, sseController.connect);

export default router;
