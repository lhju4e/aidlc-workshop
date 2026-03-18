import { body } from 'express-validator';

export const createOrderValidation = [
  body('items').isArray({ min: 1 }),
  body('items.*.menuId').isUUID(),
  body('items.*.quantity').isInt({ min: 1 }),
];

export const updateOrderStatusValidation = [
  body('status').isIn(['preparing', 'completed']),
];
