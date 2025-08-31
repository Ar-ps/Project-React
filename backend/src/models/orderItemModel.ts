// src/models/orderItemModel.ts (ringkas)
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export interface OrderItemAttrs {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;                 // NOT NULL
  unit_price: number;
  quantity: number;
  total: number;                        // jika ada di DB, wajib isi
}
type OrderItemCreation = Optional<OrderItemAttrs, 'id'>;

export class OrderItem extends Model<OrderItemAttrs, OrderItemCreation> implements OrderItemAttrs {
  public id!: number;
  public order_id!: number;
  public product_id!: number;
  public product_name!: string;
  public unit_price!: number;
  public quantity!: number;
  public total!: number;
}
OrderItem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    product_name: { type: DataTypes.STRING(255), allowNull: false },
    unit_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  },
  { sequelize, modelName: 'OrderItem', tableName: 'order_items', timestamps: false }
);
