// src/routes/productRoutes.ts
import express from 'express';
import { getProductById, getProducts } from '../controllers/productController';

const router = express.Router();

router.get('/', getProducts);  // Endpoint untuk mengambil semua produk
router.get('/:id', getProductById); // Endpoint untuk mengambil produk berdasarkan ID

export default router;

