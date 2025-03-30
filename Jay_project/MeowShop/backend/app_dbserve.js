require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise'); // 確保使用 promise 版本
const app = express();
const PORT = process.env.PORT || 3000;;

// 建立 MySQL 連接
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // 從環境變數讀取資料庫 port，預設為 3306
});

const startServer = async () => {
  try {
    await db.query('SELECT 1');
    console.log("已成功連接資料庫");

    // 資料庫連接成功後啟動伺服器
    app.listen(PORT, () => {
      console.log(`伺服器啟動於 PORT: ${PORT}`);
    });
  } catch (err) {
    console.error('資料庫連接失敗:', err);
    process.exit(1); // 終止程序
  }
};

startServer();

module.exports = { app, db };