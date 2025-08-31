import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Product } from './productModel';

export interface ProductImageAttributes {
  id: number;
  product_id: number;
  url: string;
  sort_order: number;
}

interface ProductImageCreationAttributes extends Optional<ProductImageAttributes, 'id'> {}

export class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> implements ProductImageAttributes {
  public id!: number;
  public product_id!: number;
  public url!: string;
  public sort_order!: number;

  // Relasi
  public product?: Product;
}

ProductImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    sort_order: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'ProductImage',
    tableName: 'product_images',
    timestamps: false,
  }
);
