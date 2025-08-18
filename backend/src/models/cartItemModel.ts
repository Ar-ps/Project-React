import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface CartItemAttrs {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
}
type CartItemCreation = Optional<CartItemAttrs, 'id'>;

export class CartItem extends Model<CartItemAttrs, CartItemCreation> implements CartItemAttrs {
  public id!: number;
  public cart_id!: number;
  public product_id!: number;
  public quantity!: number;
  public unit_price!: number;
}
CartItem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cart_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    unit_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  },
  { sequelize, modelName: 'cart_item', tableName: 'cart_items' }
);
