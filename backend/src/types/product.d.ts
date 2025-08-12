// types/product.ts
export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    description?: string | null; // ✅ kolom baru
    rating: number;
    label: string;
    category_id: number;
    images?: ProductImage[]; // ✅ kolom baru
  
    // relasi dari backend
    category?: {
      name: string;
    };
  }
  