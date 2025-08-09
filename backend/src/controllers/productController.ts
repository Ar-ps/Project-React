import { Request, Response } from 'express';
import { Product } from '../models/productModel';
import { Category } from '../models/categoryModel';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;

    // Mapping dari slug ke nama category di DB
    const categoryMap: Record<string, string> = {
      'best-sellers': 'Best Sellers',
      'new-arrivals': 'New Arrivals',
      'hot-sales': 'Hot Sales',
    };

    const whereCondition =
      filter && filter !== 'all' && categoryMap[filter as string]
        ? { name: categoryMap[filter as string] }
        : undefined;

    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
        required: false,
        where: whereCondition, // filter di level Category
      },
    });

    const formatted = products.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
      rating: p.rating,
      label: p.label,
      category: p.category?.name || null,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
