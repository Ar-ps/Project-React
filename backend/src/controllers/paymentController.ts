import { Request, Response } from 'express';
import { Payment } from '../models/paymentModel';
import { Order } from '../models/orderModel';

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { order_id, method, amount, currency = 'USD', status = 'pending', transaction_id = null, paid_at = null, notes = null } = req.body;

    // Validasi minimal
    if (!order_id || !method || !amount) {
      return res.status(400).json({ message: 'order_id, method, amount wajib diisi' });
    }

    // Pastikan order ada
    const order = await Order.findByPk(order_id);
    if (!order) return res.status(404).json({ message: 'Order tidak ditemukan' });

    const payment = await Payment.create({
      order_id, method, amount, currency, status, transaction_id, paid_at, notes
    });

    return res.status(201).json(payment);
  } catch (err: any) {
    console.error('createPayment error:', err);
    return res.status(500).json({ message: 'Gagal membuat payment', error: err?.message });
  }
};

export const getPayments = async (_req: Request, res: Response) => {
  try {
    const list = await Payment.findAll({ order: [['id', 'DESC']] });
    return res.json(list);
  } catch (err: any) {
    console.error('getPayments error:', err);
    return res.status(500).json({ message: 'Gagal mengambil payments' });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findByPk(req.params.id as any);
    if (!payment) return res.status(404).json({ message: 'Payment tidak ditemukan' });
    return res.json(payment);
  } catch (err: any) {
    console.error('getPaymentById error:', err);
    return res.status(500).json({ message: 'Gagal mengambil payment' });
  }
};

export const getPaymentsByOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const list = await Payment.findAll({ where: { order_id: orderId }, order: [['id', 'DESC']] });
    return res.json(list);
  } catch (err: any) {
    console.error('getPaymentsByOrder error:', err);
    return res.status(500).json({ message: 'Gagal mengambil payments by order' });
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findByPk(id as any);
    if (!payment) return res.status(404).json({ message: 'Payment tidak ditemukan' });

    // Batasi field yang bisa diupdate agar aman
    const updatable = ['method','amount','currency','status','transaction_id','paid_at','notes'] as const;
    const payload: any = {};
    for (const key of updatable) if (key in req.body) payload[key] = req.body[key];

    await payment.update(payload);
    return res.json(payment);
  } catch (err: any) {
    console.error('updatePayment error:', err);
    return res.status(500).json({ message: 'Gagal memperbarui payment' });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id as any);
    if (!payment) return res.status(404).json({ message: 'Payment tidak ditemukan' });

    await payment.destroy();
    return res.json({ message: 'Payment dihapus' });
  } catch (err: any) {
    console.error('deletePayment error:', err);
    return res.status(500).json({ message: 'Gagal menghapus payment' });
  }
};
