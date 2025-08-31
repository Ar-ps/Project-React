// src/controllers/orderController.ts
import { Request, Response } from 'express';
import { sequelize } from '../config/db';
import { Cart, CartItem, Order, OrderItem, Product } from '../models';

// POST /api/cart/checkout  { couponCode?: string }
export const checkout = async (req: Request, res: Response) => {
  // pastikan middleware auth mengisi req.user.id
  const userId = Number((req as any).user?.id);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const t = await sequelize.transaction();
  try {
    const cart = await Cart.findOne({
      where: { user_id: userId, status: 'active' },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!cart) {
      await t.rollback();
      return res.status(400).json({ message: 'Cart not found' });
    }

    const items = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [{ model: Product, as: 'product', attributes: ['id', 'name'] }],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (items.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // hitung subtotal/discount/total di server
    const subtotal = Number(
      items.reduce((s, it) => s + Number(it.unit_price) * Number(it.quantity), 0).toFixed(2)
    );

    // TODO: validasi couponCode dari req.body.couponCode
    const discount = 0; // ganti sesuai validasi kupon
    const total = Number((subtotal - discount).toFixed(2));

    // buat order
    const order = await Order.create(
      { user_id: userId, subtotal, discount, total, status: 'pending' },
      { transaction: t }
    );

    // snapshot order items
    const itemsPayload = items.map((it) => ({
      order_id: order.id,
      product_id: it.product_id,
      product_name: (it as any).product?.name || 'Product',
      unit_price: it.unit_price,
      quantity: it.quantity,
      total: Number((Number(it.unit_price) * Number(it.quantity)).toFixed(2)), // pastikan ada 'total' jika kolom DB mewajibkan
    }));

    await OrderItem.bulkCreate(itemsPayload, { transaction: t });

    // kosongkan cart + tandai converted + siapkan cart baru
    await CartItem.destroy({ where: { cart_id: cart.id }, transaction: t });
    await cart.update({ status: 'converted' }, { transaction: t });
    await Cart.create({ user_id: userId, status: 'active' }, { transaction: t });

    await t.commit();
    return res.status(201).json({
      message: 'Checkout created',
      orderId: order.id,
      subtotal,
      discount,
      total,
    });
  } catch (err: any) {
    await t.rollback();
    console.error('CHECKOUT ERROR:', err);
    return res.status(500).json({
      message: 'Checkout failed',
      error: err?.message,
      sql: err?.parent?.sqlMessage || err?.original?.sqlMessage || null,
    });
  }
};

// GET /api/orders (riwayat)
export const listOrders = async (req: Request, res: Response) => {
  const userId = Number((req as any).user?.id);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const orders = await Order.findAll({
      where: { user_id: userId },
      order: [['id', 'DESC']],
      include: [{ model: OrderItem, as: 'items' }],
    });
    return res.json(orders);
  } catch (err: any) {
    console.error('LIST ORDERS ERROR:', err);
    return res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
