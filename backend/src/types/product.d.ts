// types/product.ts
export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    rating: number;
    label: string;
    category_id: number;
  
    // relasi dari backend
    category?: {
      name: string;
    };
  }
  