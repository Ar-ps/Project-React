// src/app.ts atau src/server.ts
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import blogRoutes from './routes/blogRoutes';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // alamat frontend kamu
}));
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);

export default app;
