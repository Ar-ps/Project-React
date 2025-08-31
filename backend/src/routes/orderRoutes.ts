import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { listOrders, checkout } from '../controllers/orderController';

const router = Router();
router.use(requireAuth);

router.get('/orders', listOrders);
router.post('/cart/checkout', checkout);

export default router;
