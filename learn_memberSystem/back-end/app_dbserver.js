require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise'); // 確保使用 promise 版本
const app = express();

// 建立 MySQL 連接
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // 從環境變數讀取資料庫 port，預設為 3306
});

db.query('SELECT 1')
  .then(() => console.log("已成功連接資料庫"))
  .catch(err => {
    console.error('資料庫連接失敗:', err);
    process.exit(1); // 終止程序
  });

module.exports = { app, db };