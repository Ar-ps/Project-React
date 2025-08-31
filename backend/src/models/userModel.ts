import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface UserAttrs {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  createdAt?: Date;
  updatedAt?: Date;
}
type UserCreation = Optional<UserAttrs, 'id'>;

export class User extends Model<UserAttrs, UserCreation> implements UserAttrs {
  public id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
}
User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
  },
  { sequelize, modelName: 'user', tableName: 'users' }
);
