// 表單驗證
export default {
  validateUsername(username) {
    return username && username.trim().length > 0; // 檢查是否為空
  },

  validatePassword(password) {
    return password && password.length >= 6; // 至少6個字符
  },

  validateConfirmPassword(password, confirmPassword) {  //重複輸入密碼檢查
    if (!confirmPassword || confirmPassword !== password || !password) {
      return false;
    } else {
      return true
    }
  },

  validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email); // 簡單的 email 格式檢查
  },

  validatePhoneNumber(phoneNumber) {
    const phonePattern = /^[0-9]{10}$/; // 假設電話號碼為10位數
    return phonePattern.test(phoneNumber);
  },
};