import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { BlogAttributes } from '../types/blog';

export class Blog extends Model<BlogAttributes> implements BlogAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public image!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
  }
);
