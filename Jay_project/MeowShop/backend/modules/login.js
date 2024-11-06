// 登入API
const loginUser = async (req, res) => {
  const { username, password, keepLoggedIn } = req.body;

  try {
    // 查詢 users 表來驗證用戶
    const [results] = await db.query('SELECT * FROM users WHERE username = ? OR email = ? OR phonenumber = ?', [username, username, username]);

    if (results.length > 0) {
      const user = results[0];

      // 驗證密碼
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: '密碼錯誤' });
      }

      // 生成 JWT
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
        expiresIn: keepLoggedIn ? JWT_EXPIRES_IN_LONG : JWT_EXPIRES_IN,
      });

      // 記錄登入資訊
      await db.query('INSERT INTO login (user_id, username, refresh_token, keep_logged_in, success, login_time) VALUES (?, ?, ?, ?, ?, NOW())', [user.id, user.username, token, keepLoggedIn, true]);

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

module.exports = { loginUser };