import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import { syncDb } from './models';
import blogRoutes from './routes/blogRoutes';

const app = express();
const PORT = 5000;

app.use(cors()); // ← AKTIFKAN CORS DI SINI
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);

// Inisialisasi database
syncDb();

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
