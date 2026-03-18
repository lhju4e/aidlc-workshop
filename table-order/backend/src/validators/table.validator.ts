import { body } from 'express-validator';

export const setupTableValidation = [
  body('tableNumber').isInt({ min: 1 }),
  body('password').isString().isLength({ min: 8 }),
];
