<template>
  <div class="login">
    <form action="index.html" @submit.prevent="handleLogin" novalidate>
      <div class="loginTitle">
        <h1>會員登入</h1>
      </div>
      <div class="login-group">
        <label for="username">帳戶</label>
        <input type="text" id="username" v-model="form.username" :class="{ 'input-error': errors.username }"
          @focus="clearError('username')" placeholder="請輸入您的暱稱" required />
        <span class="error-content" :class="{ 'error-message': errors.username }">{{ usernameError }}</span>
      </div>
      <div class="login-group">
        <label for="password">密碼</label>
        <input type="password" id="password" v-model="form.password" :class="{ 'input-error': errors.password }"
          @focus="clearError('password')" placeholder="請輸入您的密碼" required />
        <div class="error-content" :class="{ 'error-message': errors.password }">{{ passwordError }}</div>
      </div>
      <div class="keep-login">
        <input type="checkbox" id="keep-login" v-model="keepLogin"/>
        <label for="keep-login">保持登入</label>
      </div>
      <input type="submit" class="login-button" value="會員登入" />
      <div class="register">
        <router-link to="/register">
          <img src="@/components/icons/register.svg">
          <span>註冊新會員</span>
        </router-link>
      </div>
    </form>
  </div>
</template>
<script>
import formValid from '@/script/registVerification'
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      keepLogin: false,
      errors: {
        username: false,
        password: false,
      },
      usernameError: '',
      passwordError: '',
      errorMessage: '',
      isLoginAttempted: false
    };
  },
  
  methods: {
    ...mapActions(['login', 'userInfo']),
    async handleLogin() {
      // 檢查是否有必填欄位為空
      this.errors.username = !formValid.validateUsername(this.form.username);
      this.errors.password = !formValid.validatePassword(this.form.password);

      // 顯示相應的錯誤信息
      this.usernameError = this.errors.username ? '使用者暱稱為必填欄位' : '';
      this.passwordError = this.errors.password ? !this.form.password ? '密碼為必填欄位' : '密碼至少6位元' : '';

      // 如果有錯誤，則阻止提交
      if (this.errors.username || this.errors.password) {
        return;
      }

      try {
        // 發送登入請求到後端
        const response = await this.$axios.post('/user/login', {
          username: this.form.username,
          password: this.form.password,
          keepLoggedIn: this.keepLogin
        });

        if (response.data.success) {
          const token = response.data.token;
          // 儲存 token 到 localStorage 或 cookies
          if (this.keepLogin === true) {
            localStorage.setItem('authToken', token);  // 保持登入的話，儲存在 LocalStorage
          } else {
            sessionStorage.setItem('authToken', token);  // 不保持登入，儲存在 SessionStorage
          }
          
          if (!this.isLoginAttempted) {
            this.isLoginAttempted = true;
            this.$swal.fire({
              title: '登入成功！',
              icon: 'success',
              text: `歡迎回來，${this.form.username}！`,
              position: 'center',
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.$store.dispatch('login');
              this.$store.dispatch('userInfo');
              if (this.$route.path !== '/') {
                this.$router.push('/');
              }
            });
          }
        }
      } catch (error) {
        if (error.status === 404){
          this.$swal.fire({
            title: '登入失敗',
            icon: 'error',
            text: '此帳號未註冊！',
            position: 'center'
          });
        } else if (error.status === 401){
          this.$swal.fire({
            title: '登入失敗',
            icon: 'error',
            text: '密碼輸入錯誤！',
            position: 'center'
          });
        }
      }
    },
    clearError(field) {
      this.errors[field] = false;
    },
  },
}
</script>
<style scoped lang="scss">
.login {
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
    .loginTitle {
      display: flex;
      justify-content: center;
      padding: 1rem;
      font-size: 28px;
      border-bottom: 1px solid var(--font-color);
    }
    .login-group {
      position: relative;
      display: flex;
      flex-direction: column;
      padding-top: 30px;
      margin: 0 2rem;
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
    }
    .keep-login {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      text-align: left;
      margin: 2rem 3rem;
      color: var(--main-color);
      label {
        position: relative;
        padding-left: 25px;
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
          border-radius: 3px;
          background-color: transparent;
        }
      }
      input[type=checkbox] {
        display: none;
        &:checked+label::before {
          content: '✓';
          display: inline-block;
          line-height: 20px;
          text-align: center;
          color: white;
          font-size: 20px;
          background-color: var(--main-color);
          box-shadow: 0px 0px 3px var(--main-color);
        }
      }
    }
    .login-button {
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
      margin: auto;
    }
    .register {
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
  }
}
</style>