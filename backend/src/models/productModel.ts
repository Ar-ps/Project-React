import { db } from '../config/db';
import { Product } from '../types/product';
import { RowDataPacket } from 'mysql2';

export const getAllProducts = (callback: (err: any, results?: Product[]) => void) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return callback(err);

    const rows = results as RowDataPacket[]; // 👈 beri tahu TypeScript ini array

    const formatted = rows.map((row: any) => ({
      ...row,
      category: JSON.parse(row.category) // Jika category disimpan sebagai JSON string
    }));

    callback(null, formatted);
  });
};
