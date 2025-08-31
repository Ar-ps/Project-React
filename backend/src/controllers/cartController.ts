// src/controllers/cartController.ts
import { Request, Response } from 'express';
import { Cart } from '../models/cartModel';
import { CartItem } from '../models/cartItemModel';
import { Product } from '../models/productModel';

async function getOrCreateCart(userId: number) {
  let cart = await Cart.findOne({ where: { user_id: userId } });
  if (!cart) cart = await Cart.create({ user_id: userId });
  return cart;
}

async function buildCartState(cartId: number) {
  const items = await CartItem.findAll({
    where: { cart_id: cartId },
    include: [{ model: Product, as: 'product' }], // pastikan alias 'product' persis seperti di model
  });
  const subtotal = items.reduce((sum, it: any) => sum + Number(it.unit_price) * Number(it.quantity), 0);
  const discount = 0;
  const total = subtotal - discount;
  return { cartId, items, subtotal, discount, total };
}

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id ?? 1;
    const cart = await getOrCreateCart(userId);
    const state = await buildCartState(cart.id);
    res.json(state);
  } catch (err: any) {
    console.error('getCart error:', err);
    res.status(500).json({ message: err?.message || 'Failed to get cart' });
  }
};

export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id ?? 1;
    const { product_id, productId, quantity } = req.body;
    const pid = Number(product_id ?? productId);
    const qty = Math.max(1, Number(quantity ?? 1));

    if (!pid) return res.status(400).json({ message: 'product_id required' });

    const prod = await Product.findByPk(pid);
    if (!prod) return res.status(404).json({ message: 'Product not found' });

    const cart = await getOrCreateCart(userId);

    // pastikan unit_price ada (FLOAT/DECIMAL)
    const unitPrice = Number(prod.price);
    if (Number.isNaN(unitPrice)) {
      return res.status(500).json({ message: 'Invalid product price in DB' });
    }

    const [item, created] = await CartItem.findOrCreate({
      where: { cart_id: cart.id, product_id: pid },
      defaults: { cart_id: cart.id, product_id: pid, quantity: qty, unit_price: unitPrice },
    });

    if (!created) {
      item.quantity = Number(item.quantity) + qty;
      await item.save();
    }

    const state = await buildCartState(cart.id);
    res.json(state);
  } catch (err: any) {
    console.error('addItemToCart error:', err);
    res.status(500).json({ message: err?.message || 'Failed to add item' });
  }
};

export const updateItemQty = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id ?? 1;
    const id = Number(req.params.id);
    const qty = Number(req.body.quantity);

    const item = await CartItem.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (qty <= 0) await item.destroy();
    else {
      item.quantity = qty;
      await item.save();
    }

    const cart = await getOrCreateCart(userId);
    const state = await buildCartState(cart.id);
    res.json(state);
  } catch (err: any) {
    console.error('updateItemQty error:', err);
    res.status(500).json({ message: err?.message || 'Failed to update qty' });
  }
};

export const removeItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id ?? 1;
    const id = Number(req.params.id);
    const item = await CartItem.findByPk(id);
    if (item) await item.destroy();

    const cart = await getOrCreateCart(userId);
    const state = await buildCartState(cart.id);
    res.json(state);
  } catch (err: any) {
    console.error('removeItem error:', err);
    res.status(500).json({ message: err?.message || 'Failed to remove item' });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id ?? 1;
    const cart = await getOrCreateCart(userId);
    await CartItem.destroy({ where: { cart_id: cart.id } });
    const state = await buildCartState(cart.id);
    res.json(state);
  } catch (err: any) {
    console.error('clearCart error:', err);
    res.status(500).json({ message: err?.message || 'Failed to clear cart' });
  }
};

export const checkout = async (_req: Request, res: Response) => {
  try {
    // implement order di sini…
    res.json({ message: 'Checkout demo', orderId: Date.now(), total: 0 });
  } catch (err: any) {
    console.error('checkout error:', err);
    res.status(500).json({ message: err?.message || 'Failed to checkout' });
  }
};
