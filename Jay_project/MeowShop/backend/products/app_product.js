const express = require('express');
const { app, db } = require('../app_dbserve.js');
app.use('/uploads', express.static('public/uploads'));

// 取得所有分類
const getCategory = async (req, res) => {
  const query = 'SELECT * FROM categories';

  try {
    const [categories] = await db.query(query);
    res.status(200).json(categories);
  } catch (error) {
    console.error('讀取分類資料時發生錯誤:', error);
    res.status(500).send('伺服器錯誤');
  }
};

// 取得分類中所有商品
const getProductsByCategory = async (req, res) => {
  const category= req.query.category;
  const query = `
  SELECT 
      p.*,
      c.category_name,
      c.category_title,
      c.category_titleimg,
      c.category_listimg
  FROM 
      products p
  JOIN
      categories c
  ON
      p.category_id = c.id
  WHERE
      c.category_name = ?`;
  const [products] = await db.query(query, category);
  try {
    res.status(200).json({ products });
  } catch (error) {
    console.error('讀取產品資料時發生錯誤:', error);
    res.status(500).send('伺服器錯誤');
  }
};

const getProduct = async (req, res) => {
  const { category, product_no } = req.params;
  const query = `
  SELECT
      p.*,
      c.category_name,
      c.category_title,
      c.category_titleimg,
      c.category_listimg
  FROM
      products p
  JOIN
      categories c
  ON
      p.category_id = c.id
  WHERE
      c.category_name = ?
  AND
      p.no = ?`;
  const [products] = await db.query(query, [category , product_no]);
  if (products.length === 0) {
    return res.status(404).send('找不到產品');
  }
  try {
    res.status(200).json({products});
  } catch (error) {
    console.error('讀取產品資料時發生錯誤:', error);
    res.status(500).send('伺服器錯誤');
  }
};

module.exports = { getCategory, getProductsByCategory, getProduct };