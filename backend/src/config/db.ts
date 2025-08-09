import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('male_fashion_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
