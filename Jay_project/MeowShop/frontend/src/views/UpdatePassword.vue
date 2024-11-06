<template>
  <div class="container">
    <!-- 左側導航 -->
    <nav class="sidebar">
      <h1>我的帳戶</h1>
      <ul>
        <router-link to="/account">
          <li>我的帳戶</li>
        </router-link>
        <router-link to="/updateaccount">
          <li>個人資訊</li>
        </router-link>
        <router-link to="/updatepassword">
          <li>更改密碼</li>
        </router-link>
        <router-link to="/orders">
          <li>訂單查詢</li>
        </router-link>
        <router-link to="/wishlist">
          <li>收藏清單</li>
        </router-link>
      </ul>
    </nav>
    <!-- 右側內容 -->
    <section class="main-content">
      <form novalidate>
        <div class="registerTitle">
          <h1>更改密碼</h1>
        </div>
        <div class="form-group">
          <label for="password">舊密碼</label>
          <input :type="passwordVisible ? 'text' : 'password'" id="password" v-model="currentPassword"
            autocomplete="off" :class="{ 'input-error': errors.password }" @focus="clearError('password')"
            placeholder="請輸入您的舊密碼" required />
          <button type="button" @click="togglePasswordVisibility('current')">
            <font-awesome-icon :icon="passwordVisible ? 'eye-slash' : 'eye'" />
          </button>
          <div class="error-content" :class="{ 'error-message': errors.currentPassword }">{{ currentPasswordError }}
          </div>
        </div>
        <div class="form-group">
          <label for="newpassword">新密碼</label>
          <input :type="newPasswordVisible ? 'text' : 'password'" id="newpassword" v-model="newPassword"
            autocomplete="off" :class="{ 'input-error': errors.newPassword }" @focus="clearError('newPassword')"
            placeholder="請輸入您的密碼" required />
          <button type="button" @click="togglePasswordVisibility('new')">
            <font-awesome-icon :icon="newPasswordVisible ? 'eye-slash' : 'eye'" />
          </button>
          <div class="error-content" :class="{ 'error-message': errors.newPassword }">{{ newPasswordError }}</div>
        </div>
        <div class="form-group">
          <label for="confirmPassword">新密碼確認</label>
          <input :type="confirmPasswordVisible ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword"
            autocomplete="off" :class="{ 'input-error': errors.confirmPassword }" @focus="clearError('confirmPassword')"
            placeholder="請再次輸入您的密碼" required />
          <button type="button" @click="togglePasswordVisibility('confirm')">
            <font-awesome-icon :icon="confirmPasswordVisible ? 'eye-slash' : 'eye'" />
          </button>
          <div class="error-content" :class="{ 'error-message': errors.confirmPassword }">{{ confirmPasswordError }}
          </div>
        </div>
        <input type="submit" class="form-button" @click.prevent="updatePassword" value="確認修改" />
      </form>
    </section>
  </div>
</template>
<script>
import formValid from "@/script/registVerification";
import { mapState } from "vuex";

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      passwordVisible: false,
      newPasswordVisible: false,
      confirmPasswordVisible: false,
      errors: {
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      },
      currentPasswordError: '',
      newPasswordError: '',
      confirmPasswordError: '',
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    togglePasswordVisibility(type) {
      if (type === 'current') {
        this.passwordVisible = !this.passwordVisible;
      } else if (type === 'new') {
        this.newPasswordVisible = !this.newPasswordVisible;
      } else if (type === 'confirm') {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
      }
    },
    async updatePassword() {
      // 檢查欄位是否為空
      this.errors.currentPassword = !formValid.validatePassword(this.currentPassword);
      this.errors.newPassword = !formValid.validatePassword(this.newPassword);
      this.errors.confirmPassword = !formValid.validateConfirmPassword(this.newPassword, this.confirmPassword);

      // 顯示對應錯誤訊息
      this.currentPasswordError = this.errors.confirmPassword ? '請輸入正確舊密碼' : '';
      this.newPasswordError = this.errors.newPassword ? '新密碼至少6位元' : '';
      this.confirmPasswordError = this.errors.confirmPassword ? '密碼與確認密碼不一致' : '';

      if (this.currentPassword === this.newPassword) {
        this.$swal.fire({
          title: '密碼重複',
          icon: 'error',
          text: '請確認輸入的密碼',
          position: 'center'
        });
        return;
      }

      if (this.errors.newPassword || this.errors.confirmPassword) {
        return;
      }

      try {
        const response = await this.$axios.patch('/user/password', {
          userId: this.user.id,
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        });

        console.log(response);
        if (response.data.success) {
          console.log('成功')
          this.$swal
            .fire({
              title: "更新成功！",
              icon: "success",
              position: "center",
              showConfirmButton: false,
              timer: 1000,
            })
            .then(() => {
              this.$store.dispatch("userInfo").then(() => {
                this.$router.push('/account');
              });
            });
        } else {
          alert("更新失敗: " + response.data.message);
        }
      } catch (error) {
        if (error.response) {
          this.$swal.fire({
            title: '更新失敗',
            icon: 'error',
            text: '舊密碼輸入錯誤',
            position: 'center'
          });
        } else {
          // 其他錯誤情況
          this.message = '請求發送失敗，請稍後再試！';
        }
      }
    },
    clearError(field) {
      this.errors[field] = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/usermenu.scss";

.main-content {
  position: relative;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  margin: 30px;
  margin-top: 4rem;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid var(--font-color);
  form {
    width: 100%;
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

      button {
        position: absolute;
        background: none;
        border: none;
        height: 40px;
        height: 40px;
        font-size: 20px;
        top: calc(4rem + 1px);
        right: 0;
        margin-right: 1rem;
        cursor: pointer;
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

        input[type="radio"] {
          display: none;

          &:checked+label::before {
            content: "";
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

    .subbtn {
      display: flex;

      button {
        flex: 1;
        margin: 1rem 2rem;
        padding: 15px 2rem;
        background: var(--main-color);
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 20px;
        cursor: pointer;
      }

      .leftbtn {
        background: var(--link-color);
      }

      .rightbtn {
        background: var(--err-color);
      }
    }
  }
}
</style>