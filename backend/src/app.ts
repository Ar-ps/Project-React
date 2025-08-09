import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // alamat frontend kamu
}));
app.use(express.json());
app.use('/api/products', productRoutes);

export default app;
