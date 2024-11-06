<template>
    <div class="login-container">
        <div class="login-box">
            <h1>Log In</h1>
            <span class="close-button" @click="goBack">&times;</span>
            <form action="index.html" @submit.prevent="login" novalidate>
                <div class="input-group">
                    <label for="username">Username</label>
                    <input 
                    class="inputBox" 
                    type="text" 
                    id="username" 
                    placeholder="Please enter username."
                    v-model="form.username" 
                    :class="{ 'input-error': errors.username }"
                    @focus="clearError('username')" 
                    required
                    />
                    <div class="error-content" :class="{ 'error-message': errors.username }">{{ usernameError }}</div>
                </div>
                <div class=" input-group">
                    <label for="password">Password</label>
                    <input 
                    class="inputBox" 
                    type="password" 
                    id="password" 
                    placeholder="Please enter password."
                    v-model="form.password" 
                    :class="{ 'input-error': errors.password }"
                    @focus="clearError('password')" 
                    required
                    />
                    <div class="error-content" :class="{ 'error-message': errors.password }">{{ passwordError }}</div>
                </div>
                <div class="input-group">
                    <label for="verification">Verification Code</label>
                    <div class="verification-group">
                        <input 
                        class="inputBox-verification" 
                        type="text" 
                        id="verification"
                        placeholder="Verification Code." 
                        v-model="form.verification"
                        :class="{ 'input-error': errors.verification }" 
                        @focus="clearError('verification')"
                        required
                        />
                        <div class="verification-code">{{ generatedCode }}</div>
                    </div>
                    <div class="error-content" :class="{ 'error-message': errors.verification }">請填入正確的驗證碼</div>
                </div>
                <div class="remember-me">
                    <input type="checkbox" id="remember-me" v-model="rememberMe">
                    <label for="remember-me">Remember Me</label>
                </div>
                <input type="submit" class="login-button" value="Log In"/>
            </form>
        </div>
    </div>
</template>

<script>
import formValid from '../script/registVerification'
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
    name: 'Login',
    mounted() {
        document.title = "Login";
        // 如果 localStorage 中有記住的用戶信息，則自動填充
        if (localStorage.getItem('rememberMe') === 'true') {
            this.form.username = localStorage.getItem('username') || '';
            this.form.password = localStorage.getItem('password') || '';
            this.rememberMe = true;
        }
    },

    data() {
        return {
            form: {
                username: '',
                password: '',
                verification: '',
            },
            errors: {
                username: false,
                password: false,
                verification: false,
            },
            rememberMe: false,
            generatedCode: '',
            usernameError: '',
            passwordError: '',
            errorMessage: ''
        };
    },

    created() {
        this.generateRandomCode();
    },

    methods: {
        goBack() {
            this.$router.push('/');
        },

        generateRandomCode() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
            let result = '';
            const length = 4;  // 設置驗證碼長度

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters[randomIndex];
            }

            this.generatedCode = result;
        },

        async login() {
            try {
                // 檢查是否有必填欄位為空
                this.errors.username = !formValid.validateUsername(this.form.username);
                this.errors.password = !formValid.validatePassword(this.form.password);
                this.errors.verification = this.form.verification !== this.generatedCode;

                // 顯示相應的錯誤信息
                this.usernameError = this.errors.username ? '使用者暱稱為必填欄位' : '';
                this.passwordError = this.errors.password ? (!this.form.password ? '密碼為必填欄位' : '密碼至少6位元') : '';

                // 如果有錯誤，則阻止提交
                if (this.errors.username || this.errors.password || this.errors.verification) {
                    return;
                }

                // 發送登入請求到後端
                const response = await axios.post('http://localhost:3000/login', {
                    username: this.form.username,
                    password: this.form.password
                });

                if (response.data.success) {
                    Swal.fire({
                        title: '登入成功！',
                        icon: 'success',
                        position: 'center',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        this.errorMessage = '';
                        if (this.rememberMe) {
                            localStorage.setItem('username', this.form.username);
                            localStorage.setItem('rememberMe', true);
                        } else {
                            localStorage.removeItem('username');
                            localStorage.removeItem('password');
                            localStorage.setItem('rememberMe', false);
                        }
                        this.$router.push({
                            path: '/welcome',
                            query: { ...this.form }
                        });
                        this.generateRandomCode();
                    });
                } else {
                    Swal.fire({
                        title: '登入失敗！',
                        icon: 'error',
                        text: this.errorMessage = response.data.message,
                        position: 'center'
                    });
                }
            } catch (error) {
                // 如果伺服器出現錯誤，例如 500 錯誤
                this.errorMessage = '系統錯誤，請稍後再試。';
            }
        },

        clearError(field) {
            this.errors[field] = false;
        }
    },
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    border-radius: 10px;
    padding: 20px;
}

.login-container .login-box {
    position: relative;
    width: 600px;
    background: linear-gradient(180deg, rgba(104, 186, 207, 0.2) 0%, rgba(0, 66, 83, 0.2) 100%), url(../img/loginbg2.png), rgba(0, 0, 0, 0.75);
    padding: 40px 20px;
    border-radius: 10px;
    box-shadow: 0 0 5px 5px rgba(0, 255, 255, 0.9);
    text-align: center;
    padding-left: calc(0.5rem + 50px);
    padding-right: calc(0.5rem + 50px);
    color: #f3c623;
}

.close-button {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 30px;
    color: #ccc;
    cursor: pointer;
    transition: color 0.3s;
}

.close-button:hover {
    color: white;
    text-shadow: 1px 1px 5px #00ccff;
}

.input-group {
    position: relative;
    margin: 3rem 0;
    text-align: left;
}

.input-group label {
    display: block;
    margin: 10px 0;
    color: #ffffff;
    text-align: left;
    font-size: 14px;
}

.input-group .inputBox {
    width: 100%;
    padding: 15px;
    border: 1px solid #00ccff;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    font-size: 14px;
    outline: none;
}

.input-group .inputBox:focus {
    box-shadow: 0 0 3px 2px #0cf;
    border: 1px solid #0cf !important;
}

.input-group .inputBox::-moz-placeholder {
    color: #777;
}

.input-group .inputBox::placeholder {
    color: #777;
}



.verification-group {
    display: flex;
    align-items: center;
    width: 100%;
}

.verification-group .inputBox-verification {
    flex: 1;
    width: 100%;
    padding: 15px;
    border: 1px solid #0cf;
    border-radius: 5px 0 0 5px;
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    font-size: 14px;
    outline: none;
}

.verification-group .inputBox-verification:focus {
    box-shadow: 0 0 2px 3px #0cf;
}

.verification-group .inputBox-verification::-moz-placeholder {
    color: #777;
}

.verification-group .inputBox-verification::placeholder {
    color: #777;
}

.verification-group .verification-code {
    padding: 15px 15px;
    background-color: #fff;
    color: red;
    border: 1px solid #fff;
    border-radius: 0 5px 5px 0;
    font-size: 16px;
}

.remember-me {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    margin: 4rem 0 2rem 0;
    text-align: left;
    color: #00ccff;
}

.remember-me label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    font-size: 14px;
    color: #ffffff;
}

.remember-me label:before {
    content: "";
    position: absolute;
    left: -7px;
    top: -7px;
    width: 20px;
    height: 20px;
    border: 2px solid #00ccff;
    border-radius: 3px;
    background-color: transparent;
}

.remember-me input[type=checkbox] {
    display: none;
}

.remember-me input[type=checkbox]:checked+label::before {
    content: '✓';
    display: inline-block;
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    background-color: rgb(0, 199, 217);
    box-shadow: 0px 0px 5px #00ccff;
}

.login-button {
    width: auto;
    padding: 15px 2rem;
    background: linear-gradient(180deg, #666666 0%, #000000 100%);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
}

.login-button:hover {
    box-shadow: 0 0 7px 3px #666;
}

@media (max-width: 768px) {
    .login-container .login-box {
        width: 100%;
    }
}
</style>