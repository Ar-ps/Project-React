export interface Product {
    id?: number;
    name: string;
    image: string;
    price: number;
    rating: number;
    label?: string;
    category: string[]; // kita simpan sebagai JSON di MySQL
  }
  