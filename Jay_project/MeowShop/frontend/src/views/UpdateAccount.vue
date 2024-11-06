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
          <h1>個人資訊</h1>
        </div>
        <div class="form-group">
          <label for="username">姓名</label>
          <input type="text" id="username" autocomplete="form.username" placeholder="請輸入您的暱稱" v-model="form.username"
            :class="{ 'input-error': errors.username }" @focus="clearError('username')" :disabled="!isEditable"
            required />
          <div class="error-content" :class="{ 'error-message': errors.username }">
            {{ usernameError }}
          </div>
        </div>
        <div class="form-group">
          <label for="email">電子郵件</label>
          <input type="email" id="email" autocomplete="form.email" placeholder="請輸入您的電子郵件" v-model="form.email"
            :class="{ 'input-error': errors.email }" @focus="clearError('email')" :disabled="!isEditable" required />
          <div class="error-content" :class="{ 'error-message': errors.email }">
            {{ emailError }}
          </div>
        </div>
        <div class="form-group">
          <label for="password">密碼</label>
          <input type="password" id="password" autocomplete="user.password" :value="user.password" disabled />
        </div>
        <div class="form-group">
          <label for="phonenumber">手機</label>
          <input type="number" id="phonenumber" autocomplete="form.phonenumber" placeholder="請輸入您的手機號碼" v-model="form.phonenumber"
            :class="{ 'input-error': errors.phonenumber }" @focus="clearError('phonenumber')" :disabled="!isEditable"
            required />
          <div class="error-content" :class="{ 'error-message': errors.phonenumber }">
            {{ phonenumberError }}
          </div>
        </div>
        <div class="form-group">
          <label for="userbirthday">生日</label>
          <input type="date" id="userbirthday" autocomplete="form.userbirthday" placeholder="請輸入您的生日" v-model="form.userbirthday"
            :disabled="!isEditable" />
        </div>
        <input type="submit" class="form-button" v-show="!upDatedbtn" @click.prevent="changeStatus" value="修改資料" />
        <div class="subbtn">
          <button type="button" class="leftbtn" v-show="upDatedbtn" @click="updateAccount">
            確認送出
          </button>
          <button type="button" class="rightbtn" v-show="upDatedbtn" @click="backStatus">
            取消修改
          </button>
        </div>
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
      form: {
        username: '',
        email: '',
        phonenumber: '',
        userbirthday: '',
      },
      errors: {
        username: false,
        email: false,
        phonenumber: false,
      },
      usernameError: "",
      emailError: "",
      phonenumberError: "",
      isEditable: false,
      upDatedbtn: false,
    };
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    user(newUser) {
      if (newUser) {
        this.form.username = newUser.username;
        this.form.email = newUser.email;
        this.form.phonenumber = newUser.phonenumber;
        this.form.userbirthday = newUser.userbirthday;
      }
    },
  },
  methods: {
    changeStatus() {
      this.isEditable = !this.isEditable;
      this.upDatedbtn = !this.upDatedbtn;
    },
    loadUserData() {
      this.form.username = this.user.username;
      this.form.email = this.user.email;
      this.form.phonenumber = this.user.phonenumber;
      this.form.userbirthday = this.user.userbirthday;
    },
    async updateAccount() {
      // 檢查欄位是否為空
      this.errors.username = !formValid.validateUsername(this.form.username);
      this.errors.email = !formValid.validateEmail(this.form.email);
      this.errors.phonenumber = !formValid.validatePhoneNumber(this.form.phonenumber);

      // 顯示對應錯誤訊息
      this.usernameError = this.errors.username ? "姓名為必填欄位" : "";
      this.emailError = this.errors.email ? "請輸入有效的電子郵件" : "";
      this.phonenumberError = this.errors.phonenumber
        ? "請輸入10位數手機號碼"
        : "";

      if (Object.values(this.errors).some((error) => error)) {
        return;
      }

      try {
        const userId = this.$store.getters.getUser.id;
        const response = await this.$axios.put(
          `http://localhost:3000/users/${userId}`,
          this.form
        );

        if (response.data.success) {
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
                this.backStatus();
              });
            });
        } else {
          alert("更新失敗: " + response.data.message);
        }
      } catch (error) {
        console.error("更新請求失敗:", error);
        alert("伺服器錯誤");
      }
    },
    backStatus() {
      this.isEditable = !this.isEditable;
      this.upDatedbtn = !this.upDatedbtn;
      this.errors.username = false;
      this.errors.email = false;
      this.errors.phonenumber = false;
      this.loadUserData();
    },
    clearError(field) {
      this.errors[field] = false;
    },
  },
  mounted() {
    this.loadUserData();
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

          &:checked + label::before {
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
