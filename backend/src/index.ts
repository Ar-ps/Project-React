import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes'; // jika ada

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route dasar
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes lainnya
app.use('/api/products', productRoutes); // contoh jika kamu punya route

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
