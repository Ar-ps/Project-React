// src/app.ts atau src/server.ts
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import blogRoutes from './routes/blogRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import './models';           // inisialisasi asosiasi SEKALI di sini
import dotenv from 'dotenv';
import { sequelize } from './config/db';
import { checkout, listOrders } from './controllers/orderController';
dotenv.config();

const app = express();

app.use(cors({ origin: ['http://localhost:5173','http://127.0.0.1:5173'] }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

// ⬇️ Mount eksplisit & konsisten
app.use('/api/products', productRoutes); // '/', '/:id'
app.use('/api/blogs', blogRoutes);
app.use('/api/cart', cartRoutes);        // → /api/cart (GET), /api/cart/items (POST), dst.
app.use('/api/orders', orderRoutes);     // '/', '/:id' dst
app.use('/api/payments', paymentRoutes);
app.post('/cart/checkout', checkout);
app.get('/orders', listOrders);
// (opsional) logger 404 biar ketahuan kalau path salah
app.use((req, res) => {
  console.error('404:', req.method, req.originalUrl);
  res.status(404).json({ message: 'Not found' });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');
    // await sequelize.sync({ alter: true })
    app.listen(5000, () => console.log('🚀 Server ready at http://localhost:5000'));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

export default app;
