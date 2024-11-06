const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../app_dbserve.js');
const JWT_SECRET = process.env.JWT_SECRET || 'MeowShop'; // JWT 密鑰
const JWT_EXPIRES_IN = '1h'; // JWT 有效期為 1 小時
const JWT_EXPIRES_IN_LONG = '30d'; // JWT 有效期為 30 天

// 取得所有用戶
const getAllUsers = async (req, res) => {
  const query = "SELECT * FROM users";

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.error("讀取用戶資料時發生錯誤:", err);
    res.status(500).send("伺服器錯誤");
  }
};

// 取得特定用戶
const getById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM users WHERE id = ?";

  try {
    const [results] = await db.query(query, [id]);
    if (results.length === 0) {
      res.status(404).send("用戶不存在");
      return;
    }
    res.status(200).json(results[0]);
  } catch (err) {
    console.error("讀取用戶資料時發生錯誤:", err);
    res.status(500).send("伺服器錯誤");
  }
};

// 註冊API
const signupUser = async (req, res) => {
  const { username, email, phonenumber, userbirthday, password } = req.body;

  try {
    // 查詢 users 表來驗證用戶
    const [results] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);

    if (results.length > 0) {
      // 使用者已存在
      return res.json({ success: false, message: '使用者或電子郵件已存在' });
    } else {
      // 使用者不存在，可以寫入 users 表
      const hashedPassword = await bcrypt.hash(password, 10); // 對密碼進行加密
      const [insertResults] = await db.query(
        'INSERT INTO users (username, email, password, phonenumber, userbirthday, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
        [username, email, hashedPassword, phonenumber, userbirthday, 'user']
      );

      return res.json({ success: true, message: '註冊成功' });
    }
  } catch (err) {
    console.error('伺服器錯誤:', err);
    return res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
};

// 登入API
const loginUser = async (req, res) => {
  let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const { username, password, keepLoggedIn } = req.body;
  // 將本地IP ::1 轉換
  if (ipAddress === '::1') {
    ipAddress = 'localhost';
  }

  try {
    // 查詢 users 表來驗證用戶
    const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (results.length > 0) {
      const user = results[0];

      // 驗證密碼
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        await db.query('INSERT INTO login (user_id, username, success) VALUES (?, ?, ?)', [user.id, user.username, false]);
        return res.status(401).json({ success: false, message: '密碼錯誤' });
      }

      // 生成 JWT
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
        expiresIn: keepLoggedIn ? JWT_EXPIRES_IN_LONG : JWT_EXPIRES_IN,
      });

      // 記錄登入資訊
      await db.query('INSERT INTO login (user_id, username, refresh_token, keep_logged_in, success, login_time, ip_address) VALUES (?, ?, ?, ?, ?, NOW(), ?)', [user.id, user.username, token, keepLoggedIn, true, ipAddress]);

      return res.json({ success: true, message: '登入成功', token });
    } else {
      // 無此會員
      return res.status(404).json({ success: false, message: '無此會員' });
    }
  } catch (err) {
    console.error('伺服器錯誤:', err);
    return res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
};

// 登出
const logoutUser = async (req, res) => {
  const { token } = req.body;
  try {
    const query = 
    `UPDATE
      login SET logout_time = NOW() WHERE refresh_token = ?`;
    await db.query(query, [token]);
    res.status(200).json({ success: true, message: '登出成功' });
  } catch (err) {
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
};

// 更新使用者資料
const updateUser = async (req, res) => {
  const { id } = req.params;  // 從 URL 獲取使用者 ID
  const { username, email, phonenumber, userbirthday } = req.body;  // 從請求體中獲取更新的資料

  try {
    // 更新 users 表中的使用者資料
    const query = 
    `UPDATE 
        users
      SET
        username = ?, email = ?, phonenumber = ?, userbirthday = ?, updated_at = NOW()
      WHERE 
        id = ?`;
    const [results] = await db.query(query, [username, email, phonenumber, userbirthday, id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: '用戶不存在' });
    }

    res.status(200).json({ success: true, message: '用戶資料更新成功' });
  } catch (err) {
    console.error("更新用戶資料時發生錯誤:", err);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
};

// 解析 token 取得使用者資料
const getUserprofile = async (req, res) => {
  const query = "SELECT * FROM users WHERE id = ?";

  if (!req.user || !req.user.id) {
    return res.status(401).send("未經授權的請求");
  }

  try {
    const [results] = await db.query(query, [req.user.id]);

    if (results.length === 0) {
      return res.status(404).send("用戶不存在");
    }

    return res.json(results[0]);

  } catch (err) {
    console.error("讀取用戶資料時發生錯誤:", err);
    return res.status(500).send("伺服器錯誤");
  }
};

// 更新密碼
const updatePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  try {
    // 查詢用戶資料
    const [userResults] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (userResults.length === 0) {
      return res.status(404).json({ message: '用戶不存在' });
    }
    const user = userResults[0];

    // 驗證當前密碼是否正確
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: '當前密碼不正確' });
    }
    // 將新密碼加密並更新到資料庫
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

    res.status(200).json({ success: true, message: '密碼更新成功' });
  } catch (error) {
    console.error('更新密碼時發生錯誤：', error);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
};

module.exports = { getAllUsers, getById, signupUser, loginUser, logoutUser, updateUser, getUserprofile, updatePassword };