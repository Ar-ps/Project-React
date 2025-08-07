import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ganti sesuai konfigurasi MySQL-mu
  database: 'male_fashion_db',
});
