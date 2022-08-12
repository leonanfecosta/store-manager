const mysql = require('mysql2/promise');
require('dotenv').config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } = process.env;

const connection = mysql.createPool({
  host: MYSQL_HOST || 'localhost',
  user: MYSQL_USER || 'root',
  port: MYSQL_PORT || '3306',
  password: MYSQL_PASSWORD || 'password',
  database: MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;
