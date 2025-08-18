import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import blogRoutes from './routes/blogRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();
const PORT = 5000;

app.use(cors()); // ← AKTIFKAN CORS DI SINI
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Inisialisasi database

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
