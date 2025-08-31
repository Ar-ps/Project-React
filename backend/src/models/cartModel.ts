import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface CartAttrs {
  id: number;
  user_id: number;
  status: 'active' | 'converted';
}
type CartCreation = Optional<CartAttrs, 'id' | 'status'>;

export class Cart extends Model<CartAttrs, CartCreation> implements CartAttrs {
  public id!: number;
  public user_id!: number;
  public status!: 'active' | 'converted';
}
Cart.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    status: { type: DataTypes.ENUM('active','converted'), allowNull: false, defaultValue: 'active' },
  },
  { sequelize, modelName: 'cart', tableName: 'carts' }
);
