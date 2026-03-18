import { body } from 'express-validator';

export const updatePaymentValidation = [
  body('status').isIn(['unpaid', 'paid', 'failed']),
];
