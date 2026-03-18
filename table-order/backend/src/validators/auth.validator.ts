import { body } from 'express-validator';

export const registerValidation = [
  body('storeName').isString().isLength({ min: 1, max: 100 }),
  body('username').isString().isLength({ min: 1, max: 50 }),
  body('password').isString().isLength({ min: 8 }),
];

export const adminLoginValidation = [
  body('storeId').isUUID(),
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
];

export const tableLoginValidation = [
  body('storeId').isUUID(),
  body('tableNumber').isInt({ min: 1 }),
  body('password').isString().notEmpty(),
];
