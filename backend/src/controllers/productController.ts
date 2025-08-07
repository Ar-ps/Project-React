import { Request, Response } from 'express';
import { getAllProducts } from '../models/productModel';

export const getProducts = (req: Request, res: Response) => {
  getAllProducts((err, products) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch products' });
    res.json(products);
  });
};
