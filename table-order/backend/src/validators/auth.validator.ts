import { body } from 'express-validator';

export const registerValidation = [
  body('storeName').isString().notEmpty().isLength({ max: 100 }),
  body('username').isString().notEmpty().isLength({ max: 50 }),
  body('password').isString().isLength({ min: 8 }),
];

export const adminLoginValidation = [
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
  body('storeId').optional().isUUID(),
  body('storeName').optional().isString().notEmpty(),
];

export const tableLoginValidation = [
  body('password').isString().notEmpty(),
  body('tableNumber').isInt({ min: 1 }),
  body('storeId').optional().isUUID(),
  body('storeName').optional().isString().notEmpty(),
];
