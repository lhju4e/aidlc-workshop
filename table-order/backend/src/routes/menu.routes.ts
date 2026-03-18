import { Router } from 'express';
import multer from 'multer';
import { menuController } from '../controllers/menu.controller';
import { authenticate, authorize } from '../middleware/auth';
import { createMenuValidation, updateMenuValidation, reorderMenuValidation, createCategoryValidation } from '../validators/menu.validator';
import { handleValidationErrors } from '../middleware/validate';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5242880 } });
const router = Router();

router.use(authenticate);
router.get('/', menuController.getMenus);
router.get('/categories', menuController.getCategories);
router.post('/', authorize('admin'), upload.single('image'), createMenuValidation, handleValidationErrors, menuController.createMenu);
router.put('/:id', authorize('admin'), upload.single('image'), updateMenuValidation, handleValidationErrors, menuController.updateMenu);
router.delete('/:id', authorize('admin'), menuController.deleteMenu);
router.put('/reorder', authorize('admin'), reorderMenuValidation, handleValidationErrors, menuController.reorderMenus);
router.post('/categories', authorize('admin'), createCategoryValidation, handleValidationErrors, menuController.createCategory);

export default router;
