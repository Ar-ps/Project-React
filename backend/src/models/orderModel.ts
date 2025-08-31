import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface OrderAttrs {
  id: number;
  user_id: number;
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
}
type OrderCreation = Optional<OrderAttrs, 'id' | 'discount' | 'status'>;

export class Order extends Model<OrderAttrs, OrderCreation> implements OrderAttrs {
  public id!: number;
  public user_id!: number;
  public subtotal!: number;
  public discount!: number;
  public total!: number;
  public status!: 'pending' | 'paid' | 'cancelled';
}
Order.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    discount: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
    total: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    status: { type: DataTypes.ENUM('pending','paid','cancelled'), allowNull: false, defaultValue: 'pending' },
  },
  { sequelize, modelName: 'order', tableName: 'orders' }
);
