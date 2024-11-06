const cors = require("cors");
const bodyParser = require('body-parser');
const { app, db } = require("./app_dbserver.js");

app.use(cors());
app.use(bodyParser.json());

// x-www-form-urlencoded 解析
// app.use(express.urlencoded({ extended: true }));

// 登入API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 查詢 users 表來驗證用戶
    const [results] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    if (results.length > 0) {
      // 使用者存在，寫入 Login 表
      const [insertResults] = await db.query('INSERT INTO Login (username, password) VALUES (?, ?)', [username, password]);

      return res.json({ success: true, message: '登入成功' });
    } else {
      // 無此會員
      return res.json({ success: false, message: '無此會員' });
    }
  } catch (err) {
    console.error('伺服器錯誤:', err);
    return res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send("請提供所有必需的欄位：username, password");
  }

  try {
    const results = await db.execute(
      "INSERT INTO Login (username, password) VALUES (?, ?)",
      [username, password]
    );
    
    res.status(201).send({
      id: results.insertId,
      username,
      password
    });
  } catch (err) {
    console.error("新增用戶時發生錯誤:", err);
    res.status(500).send("伺服器錯誤");
  }
});

// 取得所有用戶
app.get("/users", (req, res) => {
  const query = "SELECT * FROM Login";

  db.query(query, (err, results) => {
    if (err) {
      console.error("讀取用戶資料時發生錯誤:", err);
      res.status(500).send("伺服器錯誤");
      return;
    }
    res.status(200).json(results);
  });
});

// 取得特定用戶
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM users WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("讀取用戶資料時發生錯誤:", err);
      res.status(500).send("伺服器錯誤");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("用戶不存在");
      return;
    }
    res.status(200).json(results[0]);
  });
});

// 更新用戶資料
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, account, password, email } = req.body;

  // 創建一個用來存儲動態 SQL 查詢語句的陣列
  const fieldsToUpdate = [];
  const values = [];

  // 根據請求體中的資料動態添加要更新的欄位
  if (username) {
    fieldsToUpdate.push("username = ?");
    values.push(username);
  }
  if (account) {
    fieldsToUpdate.push("account = ?");
    values.push(account);
  }
  if (password) {
    // 這裡可以加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);
    fieldsToUpdate.push("password = ?");
    values.push(hashedPassword);
  }
  if (email) {
    fieldsToUpdate.push("email = ?");
    values.push(email);
  }

  // 如果沒有要更新的欄位，則返回錯誤
  if (fieldsToUpdate.length === 0) {
    return res.status(400).send("請提供至少一個要更新的欄位");
  }

  // 動態生成 SQL 語句
  const query = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
  values.push(id); // 將 id 加入到陣列的最後

  try {
    // 更新資料庫
    db.query(query, values, (err, results) => {
      if (err) {
        console.error("更新用戶資料時發生錯誤:", err);
        return res.status(500).send("伺服器錯誤");
      }

      if (results.affectedRows === 0) {
        return res.status(404).send("用戶不存在");
      }

      res.status(200).send("用戶資料已更新");
    });
  } catch (err) {
    console.error("伺服器發生錯誤:", err);
    res.status(500).send("伺服器錯誤");
  }
});

// 刪除用戶
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("刪除用戶時發生錯誤:", err);
      res.status(500).send("伺服器錯誤");
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send("用戶不存在");
      return;
    }
    res.status(200).send("用戶已刪除");
  });
});

// 啟動伺服器
const port = 3000;

app.listen(port, () => {
  console.log(`伺服器在 http://localhost:${port} 啟動`);
});
