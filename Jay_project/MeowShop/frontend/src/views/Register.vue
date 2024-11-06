<template>
  <div class="register">
    <form @submit.prevent="register" novalidate>
      <div class="registerTitle">
        <h1>註冊新帳號</h1>
      </div>
      <div class="form-group">
        <label for="username">姓名（必填）</label>
        <input type="text" id="username" v-model="username" :class="{ 'input-error': errors.username }"
          @focus="clearError('username')" placeholder="請輸入您的姓名" required />
        <div class="error-content" :class="{ 'error-message': errors.username }">{{ usernameError }}</div>
      </div>
      <div class="form-group">
        <label for="email">電子郵件（必填）</label>
        <input type="email" id="email" v-model="email" :class="{ 'input-error': errors.email }"
          @focus="clearError('email')" placeholder="請輸入您的E-mail" required />
        <div class="error-content" :class="{ 'error-message': errors.email }">{{ emailError }}</div>
      </div>
      <div class="form-group">
        <label for="password">密碼（必填）</label>
        <input type="password" id="password" v-model="password" :class="{ 'input-error': errors.password }"
          @focus="clearError('password')" placeholder="請輸入您的密碼" required />
        <div class="error-content" :class="{ 'error-message': errors.password }">{{ passwordError }}</div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">密碼確認（必填）</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword"
          :class="{ 'input-error': errors.confirmPassword }" @focus="clearError('confirmPassword')"
          placeholder="請再次輸入您的密碼" required />
        <div class="error-content" :class="{ 'error-message': errors.confirmPassword }">{{ confirmPasswordError }}</div>
      </div>
      <div class="form-group">
        <label for="phonenumber">手機（必填）</label>
        <input type="text" id="phonenumber" v-model="phonenumber" :class="{ 'input-error': errors.phonenumber }"
          @focus="clearError('phonenumber')" placeholder="請輸入您的手機" required />
        <div class="error-content" :class="{ 'error-message': errors.phonenumber }">{{ phonenumberError }}</div>
      </div>
      <div class="form-group">
        <label for="userbirthday">生日</label>
        <input type="date" id="userbirthday" v-model="userbirthday" placeholder="請輸入您的生日" />
      </div>
      <input type="submit" class="form-button" value="註冊會員" />
      <div class="loginMsg">
        <p>我已經有會員帳號了？&emsp;</p>
        <router-link to="/login">
          <span>會員登入</span>
        </router-link>
      </div>
      <div class="msg">
        <p>註冊表示同意<span>商店服務條款</span>與<span>會員責任規範及個資聲明</span></p>
      </div>
    </form>
  </div>
</template>
<script>
import formValid from "@/script/registVerification";
export default {
  name: "Register",
  data() {
    return {
      username: '',
      email: '',
      phonenumber: '',
      userbirthday: '',
      password: '',
      confirmPassword: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
      phonenumberError: '',
      confirmPasswordError: '',
      userbirthdayError: '',
      errors: {
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        phonenumber: false,
        userbirthday: false
      }
    };
  },
  methods: {
    clearError(field) {
      this.errors[field] = false;
    },
    async register() {
      // 檢查必填欄位是否為空
      this.errors.username = !formValid.validateUsername(this.username);
      this.errors.email = !formValid.validateEmail(this.email);
      this.errors.password = !formValid.validatePassword(this.password);
      this.errors.confirmPassword = !formValid.validateConfirmPassword(this.password, this.confirmPassword);
      this.errors.phonenumber = !formValid.validatePhoneNumber(this.phonenumber);

      // 顯示相應的錯誤信息
      this.usernameError = this.errors.username ? '姓名為必填欄位' : '';
      this.emailError = this.errors.email ? '請輸入有效的電子郵件' : '';
      this.passwordError = this.errors.password ? '密碼至少6位元' : '';
      this.confirmPasswordError = this.errors.confirmPassword ? '密碼與確認密碼不一致' : '';
      this.phonenumberError = this.errors.phonenumber ? '請輸入10位數手機號碼' : '';

      // 如果有錯誤，則阻止提交
      if (Object.values(this.errors).some(error => error)) {
        return;
      }

      try {
        const response = await this.$axios.post('/user/signup', {
          username: this.username,
          email: this.email,
          phonenumber: this.phonenumber,
          userbirthday: this.userbirthday,
          password: this.password
        });

        if (response.data.success) {
          this.$swal.fire({
            title: '註冊成功！',
            icon: 'success',
            position: 'center',
            showConfirmButton: false,
            timer: 1000
          }).then(() => {
            this.$router.push('/login'); 
          });
        } else {
          console.log('失敗啦');
        }
      } catch (error) {
        console.log('error', error);
        if (error.status === 500) {
          this.$swal.fire({
            title: '註冊失敗',
            icon: 'error',
            text: '此帳號已被註冊！',
            position: 'center'
          });
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 1rem auto;

  form {
    position: relative;
    border: 1px solid var(--font-color);
    border-radius: 20px;
    padding: 20px;
    width: 50%;

    .registerTitle {
      display: flex;
      justify-content: center;
      padding: 1rem;
      font-size: 28px;
      border-bottom: 1px solid var(--font-color);
    }

    .form-group {
      position: relative;
      display: flex;
      flex-direction: column;
      padding-top: 30px;
      margin: 0 2rem;

      p {
        margin-top: 10px;
        color: var(--main-color);
      }

      label {
        font-size: 18px;
        margin-bottom: 10px;
      }

      input {
        height: 2rem;
        border: 1px solid var(--font-color);
        border-radius: 5px;
        padding: 10px 1rem;
        margin-bottom: 20px;
      }

      .genderbox {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        label {
          position: relative;
          padding-left: 25px;
          margin: 10px;
          cursor: pointer;
          font-size: 14px;
      
          &::before {
            content: "";
            position: absolute;
            left: -7px;
            top: -7px;
            width: 20px;
            height: 20px;
            border: 2px solid var(--main-color);
            border-radius: 50%;
            background-color: transparent;
          }
        }
        input[type=radio] {
          display: none;
          &:checked+label::before {
            content: '';
            display: inline-block;
            line-height: 20px;
            text-align: center;
            font-size: 20px;
            background-color: var(--main-color);
            box-shadow: 0px 0px 3px var(--main-color);
          }
        }
      }
    }

    .form-button {
      display: flex;
      justify-content: center;
      padding: 15px 2rem;
      width: 50%;
      background: var(--main-color);
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 20px;
      cursor: pointer;
      margin: 1rem auto;
    }
    .loginMsg {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 1rem;
      a {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 30px;
        }

        span {
          font-size: 16px;
          color: var(--link-color);
        }
      }
    }
    .msg {
      display: flex;
      justify-content: center;
      span {
        font-size: 16px;
        color: var(--link-color);
      }
      margin-bottom: 1rem;
    }
  }
}
</style>