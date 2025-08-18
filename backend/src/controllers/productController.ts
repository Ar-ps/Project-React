import { Request, Response } from 'express';
import { Product, Category, ProductImage } from '../models';

type JsonImage = { id: number; url: string; sort_order?: number };

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const rows = await Product.findAll();
    res.json(rows);
  } catch (error: any) {
    console.error('getProducts error:', error?.message || error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid id' });

    // 1) Produk dulu
    const prod = await Product.findByPk(id);
    if (!prod) return res.status(404).json({ message: 'Product not found' });

    // 2) Category (opsional)
    let catName: string | null = null;
    const catId = (prod as any).category_id ?? null;
    if (catId) {
      const cat = await Category.findByPk(catId, { attributes: ['id', 'name'] });
      catName = (cat as any)?.name ?? null;
    }

    // 3) Images
    const imgsRaw = await ProductImage.findAll({
      where: { product_id: id },
      order: [['sort_order', 'ASC'], ['id', 'ASC']],
    });
    const images: JsonImage[] = imgsRaw.map((r: any) => ({
      id: r.id,
      url: r.url ?? r.image ?? '',
      sort_order: r.sort_order ?? undefined,
    })).filter(im => im.url);

    // 4) Payload final
    const p: any = prod.toJSON();
    res.json({
      id: p.id,
      name: p.name,
      image: p.image,
      price: Number(p.price),
      description: p.description ?? null,
      rating: Number(p.rating ?? 0),
      label: p.label ?? null,
      category_id: p.category_id ?? null,
      category: catName,
      images,
    });
  } catch (error: any) {
    console.error('getProductById error:', {
      name: error?.name,
      message: error?.message,
      sql: error?.sql,
      stack: error?.stack,
    });
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};
