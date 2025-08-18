// src/models/index.ts
import { sequelize } from '../config/db';
import { Product } from './productModel';
import { Category } from './categoryModel';
import { ProductImage } from './productImageModel';
import { User } from './userModel';
import { Cart } from './cartModel';
import { CartItem } from './cartItemModel';
import { Order } from './orderModel';
import { OrderItem } from './orderItemModel';
import { Payment } from './paymentModel';

// Category ↔ Product
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Product ↔ ProductImage
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// User/Cart ↔ CartItem
User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id', as: 'cart' });

Product.hasMany(CartItem, { foreignKey: 'product_id', as: 'productCartItems' });
CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Order ↔ OrderItem
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// Order ↔ Payment
Order.hasMany(Payment, { foreignKey: 'order_id', as: 'payments' });
Payment.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

export {
  sequelize,
  Product, Category, ProductImage,
  User, Cart, CartItem, Order, OrderItem,
  Payment
};
