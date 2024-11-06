// 驗證身份的 middleware
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  const Key = process.env.JWT_SECRET || "MeowShop";

  if (!token) {
    return res.status(401).send("未提供 token");
  }

  try {
    const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    console.log(actualToken);
    const user = jwt.verify(actualToken, Key);

    req.user = user; // 將解碼的用戶資訊附加到請求物件上
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).send("無效的 token");
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).send("token 已過期");
    } else {
      console.error("Token 驗證時發生錯誤:", err);
      return res.status(500).send("伺服器錯誤");
    }
  }
};

module.exports = verifyToken;
