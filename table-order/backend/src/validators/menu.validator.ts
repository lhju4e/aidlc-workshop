import { body } from 'express-validator';

export const createMenuValidation = [
  body('name').isString().isLength({ min: 1, max: 100 }),
  body('price').isInt({ min: 0 }),
  body('categoryId').isUUID(),
  body('description').optional().isString(),
];

export const updateMenuValidation = [
  body('name').optional().isString().isLength({ min: 1, max: 100 }),
  body('price').optional().isInt({ min: 0 }),
  body('categoryId').optional().isUUID(),
  body('description').optional().isString(),
];

export const reorderMenuValidation = [
  body('menuIds').isArray({ min: 1 }),
  body('menuIds.*').isUUID(),
];

export const createCategoryValidation = [
  body('name').isString().isLength({ min: 1, max: 50 }),
];
