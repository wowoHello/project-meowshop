const cors = require("cors");
const express = require('express');
const { app } = require("./app_dbserve.js");
const verifyToken = require('./auth.js');
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));
// 會員相關
const { getAllUsers, getById, signupUser, loginUser, logoutUser, updateUser, getUserprofile, updatePassword } = require('./member/app_member');
// 商品相關
const { getAllProducts, getCategory, getProductsByCategory, getProduct } = require('./products/app_product');

// ----- member資料夾 - 會員相關ＡＰＩ -----
// 解析使用者
app.get("/users/profile", verifyToken, getUserprofile);
// 查詢所有使用者
app.get("/users", verifyToken, getAllUsers);
// 查詢特定使用者
app.get("/users/:id", verifyToken, getById);
// 註冊
app.post('/user/signup', signupUser);
// 登入
app.post('/user/login', loginUser);
// 登出
app.post('/user/logout', logoutUser);
// 更新使用者資料
app.put("/users/:id", verifyToken, updateUser);
// 更新密碼
app.patch("/user/password", verifyToken, updatePassword);


// ----- products資料夾 - 商品相關ＡＰＩ -----
// 取得所有產品
app.get('/products', getAllProducts)
// 取得所有分類
app.get('/categories', getCategory);
// 取得分類中的商品
app.get('/products', getProductsByCategory);
// 取得商品詳細資料
app.get('/product/:category/:product_no', getProduct);
