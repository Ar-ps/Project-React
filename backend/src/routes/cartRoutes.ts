// src/routes/cartRoutes.ts
import { Router } from 'express';
import {
  addItemToCart, getCart, updateItemQty, removeItem, clearCart, checkout
} from '../controllers/cartController';

const router = Router();

// prefix sudah '/api/cart' di app.ts, di sini JANGAN ditambah '/cart' lagi
router.get('/', getCart);                    // GET    /api/cart
router.post('/items', addItemToCart);        // POST   /api/cart/items
router.patch('/items/:id', updateItemQty);   // PATCH  /api/cart/items/:id
router.delete('/items/:id', removeItem);     // DELETE /api/cart/items/:id
router.delete('/clear', clearCart);          // DELETE /api/cart/clear
router.post('/checkout', checkout);          // POST   /api/cart/checkout

export default router;
