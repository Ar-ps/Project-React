// src/components/home.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  label: string | null;
  category: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<Product[]>('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err: unknown) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Produk</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
