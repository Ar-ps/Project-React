// src/controllers/productController.ts
import { Request, Response } from 'express';
import { Product } from '../models/productModel';
import { Category } from '../models/categoryModel';
import { ProductImage } from '../models/productImageModel';


// Fungsi untuk mengambil semua produk
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    // Ambil data produk beserta gambar dari tabel product_images
    const product = await Product.findByPk(productId, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
        {
          model: ProductImage,
          as: 'images', // Mengambil gambar-gambar terkait
          attributes: ['url', 'sort_order'],
          order: [['sort_order', 'ASC']], // Mengurutkan gambar berdasarkan sort_order
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Format data produk dan gambar untuk dikirimkan ke frontend
    const formattedProduct = {
      id: product.id,
      name: product.name,
      image: product.image,  // Gambar utama produk
      price: product.price,
      rating: product.rating,
      label: product.label,
      category: product.category?.name || null,
      images: product.images || [],  // Menyertakan gambar dari product_images
    };

    res.json(formattedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};
