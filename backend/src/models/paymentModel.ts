// src/models/paymentModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export interface PaymentAttributes {
  id: number;
  order_id: number;
  method: 'check'|'paypal'|'bank_transfer';
  amount: number;
  currency?: string;
  status: 'pending'|'success'|'failed';
  transaction_id?: string | null;
  paid_at?: Date | null;
  notes?: string | null;                 // <-- tambahkan
  created_at?: Date;
  updated_at?: Date;
}

type PaymentCreation = Optional<
  PaymentAttributes,
  'id'|'currency'|'transaction_id'|'paid_at'|'notes'|'created_at'|'updated_at'  // <-- tambahkan 'notes'
>;

export class Payment extends Model<PaymentAttributes, PaymentCreation> implements PaymentAttributes {
  public id!: number;
  public order_id!: number;
  public method!: 'check'|'paypal'|'bank_transfer';
  public amount!: number;
  public currency?: string;
  public status!: 'pending'|'success'|'failed';
  public transaction_id?: string | null;
  public paid_at?: Date | null;
  public notes?: string | null;          // <-- tambahkan
  public created_at?: Date;
  public updated_at?: Date;
}

Payment.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },  // INTEGER agar match orders.id
  order_id: { type: DataTypes.INTEGER, allowNull: false },
  method: { type: DataTypes.ENUM('check','paypal','bank_transfer'), allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  currency: { type: DataTypes.CHAR(3), allowNull: false, defaultValue: 'USD' },
  status: { type: DataTypes.ENUM('pending','success','failed'), allowNull: false, defaultValue: 'pending' },
  transaction_id: { type: DataTypes.STRING(100), allowNull: true },
  paid_at: { type: DataTypes.DATE, allowNull: true },
  notes: { type: DataTypes.STRING(255), allowNull: true },                  // <-- tambahkan
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'payments',
  timestamps: false,
  underscored: true,
});
