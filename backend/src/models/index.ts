// src/models/index.ts
import { sequelize } from '../config/db';
import { Product } from './productModel';
import { Category } from './categoryModel';

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category',
});

export const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected!');
    await sequelize.sync(); // opsional: { alter: true }
  } catch (error) {
    console.error('❌ Failed to connect to DB:', error);
  }
};

export { Product, Category };
