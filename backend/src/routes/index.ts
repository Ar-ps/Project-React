import { Router } from 'express';
import cartRoutes from './cartRoutes';
import orderRoutes from './orderRoutes';
import productRoutes from './productRoutes';
import blogRoutes from './blogRoutes';
import paymentRoutes from './paymentRoutes';
import { checkout, listOrders } from '../controllers/orderController';
// kamu juga bisa mount productRoutes yang sudah ada: /products
const router = Router();

router.use('/', cartRoutes);
router.use('/', orderRoutes);


// Mount yang RELATIF harus diberi prefix di sini
router.use('/products', productRoutes);
router.use('/blogs', blogRoutes);
router.use('/payments', paymentRoutes);
router.post('/cart/checkout', checkout);
router.get('/orders', listOrders);

export default router;
