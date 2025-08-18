import { Router } from 'express';
import {
  createPayment,
  getPayments,
  getPaymentById,
  getPaymentsByOrder,
  updatePayment,
  deletePayment
} from '../controllers/paymentController';

const router = Router();

// /api/payments
router.get('/payments', getPayments);
router.post('/payments', createPayment);

// /api/payments/:id
router.get('/payments/:id', getPaymentById);
router.patch('/payments/:id', updatePayment);
router.delete('/payments/:id', deletePayment);

// /api/orders/:orderId/payments
router.get('/orders/:orderId/payments', getPaymentsByOrder);

export default router;
