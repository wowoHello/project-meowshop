<template>
    <main>
        <img class="logo-img" src="../img/logo.png" alt="97LOGO">
        <h1>Free Registration</h1>
        <img class="title-img" src="../img/titleimg.png" alt="titleImg">
        <div class="numIcon">
            <div class="num1">1</div>
            <div class="num2">2</div>
        </div>
        <div class="register-container">
            <div class="register-box">
                <p class="title">Continue With</p>
                <div class="icon-box">
                    <img src="../img/facebook.png" alt="facebook">
                    <img src="../img/google.png" alt="google">
                </div>
                <p class="p-line">or</p>
                <form @submit.prevent="submitForm" novalidate>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="username">Username <span class="required"></span></label>
                            <input 
                            type="text" 
                            id="username" 
                            placeholder="username"
                            :class="{ 'input-error': errors.username }" 
                            @focus="clearError('username')"
                            v-model="form.username" 
                            required
                            />
                            <div class="error-content" :class="{ 'error-message': errors.username }">{{ usernameError }}</div>
                        </div>
                        <div class="form-group">
                            <label for="password">Password <span class="required"></span></label>
                            <input 
                            type="password" 
                            id="password" 
                            placeholder="password"
                            :class="{ 'input-error': errors.password }" 
                            @focus="clearError('password')"
                            v-model="form.password" 
                            required
                            />
                            <div class="error-content" :class="{ 'error-message': errors.password }">{{ passwordError }}</div>
                        </div>
                        <div class="form-group">
                            <label for="confirm-password">Confirm Password <span class="required"></span></label>
                            <input 
                            type="password" 
                            id="confirmpassword" 
                            placeholder="confirm password"
                            :class="{ 'input-error': errors.confirmpassword }"
                            @focus="clearError('confirmpassword')" 
                            v-model="form.confirmpassword" 
                            required
                            />
                            <div class="error-content" :class="{ 'error-message': errors.confirmpassword }">{{ confirmPasswordError }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="phonenumber">Phone Number <span class="required"></span></label>
                            <input type="tel" id="phonenumber" placeholder="phone number"
                                :class="{ 'input-error': errors.phonenumber }" @focus="clearError('phonenumber')"
                                v-model="form.phonenumber" required>
                            <div class="error-content" :class="{ 'error-message': errors.phonenumber }">{{ phonenumberError }}</div>
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail Address <span class="required"></span></label>
                            <input type="email" id="email" placeholder="email address"
                                :class="{ 'input-error': errors.email }" @focus="clearError('email')"
                                v-model="form.email" required>
                            <div class="error-content" :class="{ 'error-message': errors.email }">{{ emailError }}</div>
                        </div>
                        <div class="form-group">
                            <label for="identity">Identity No</label>
                            <input type="text" id="identity" placeholder="identity no">
                        </div>
                        <div class="form-group">
                            <label for="referral">Referral</label>
                            <input type="text" id="referral" placeholder="referral">
                        </div>
                        <div class="form-group verification-code">
                            <label for="verification">Verification Code <span class="required"></span></label>
                            <div class="verification">
                                <input type="text" id="verification" placeholder="Verification Code"
                                    :class="{ 'input-error': errors.verification }" @focus="clearError('verification')"
                                    v-model="form.verification" required>
                                <div class="code">{{ generatedCode }}</div>
                            </div>
                            <div class="error-content" :class="{ 'error-message': errors.verification }">請填入正確的驗證碼</div>
                        </div>
                        <div class="iAgree">
                            <input type="checkbox" id="iAgree" v-model="iAgree">
                            <label for="iAgree">I agree. <span>Terms & Conditions</span></label>
                        </div>
                        <input type="submit" class="confirm-button" value="Confirm" />
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script>
import Swal from 'sweetalert2';
import formValid from '../script/registVerification'

export default {
    name: 'Register',
    mounted() {
        document.title = "Register";
    },

    data() {
        return {
            form: {
                username: '',
                password: '',
                confirmpassword: '',
                phonenumber: '',
                email: '',
                verification: '',
            },
            errors: {
                username: false,
                password: false,
                confirmpassword: false,
                phonenumber: false,
                email: false,
                verification: false
            },
            iAgree: false,
            generatedCode: '',
            usernameError: '',
            emailError: '',
            passwordError: '',
            phonenumberError: '',
            confirmPasswordError: ''
        }
    },

    created() {
        this.generateRandomCode();
    },

    computed: {
        userErrorStyle: function() { return {'opacity': this.username ? '' : '1'}}
    },

    methods: {
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

        submitForm() {
            this.usernameError = '';
            this.emailError = '';
            this.passwordError = '';
            this.phonenumberError = '';
            this.confirmPasswordError = '';

            this.errors.username = !formValid.validateUsername(this.form.username);
            this.errors.password = !formValid.validatePassword(this.form.password);
            this.errors.confirmpassword = !formValid.validateConfirmPassword(this.form.password, this.form.confirmpassword);
            this.errors.email = !formValid.validateEmail(this.form.email);
            this.errors.phonenumber = !formValid.validatePhoneNumber(this.form.phonenumber);
            this.errors.verification = !formValid.validateVerification(this.form.verification, this.generatedCode);

            // 驗證用戶名是否為空
            if (!formValid.validateUsername(this.form.username)) {
                this.errors.username = true;
                this.usernameError = '使用者暱稱為必填欄位';
            } else {
                this.errors.username = false;
            }

            // 驗證電子郵件格式
            if (!this.form.email) {
                this.errors.email = true;
                this.emailError = '電子郵件為必填欄位';
            } else if (!formValid.validateEmail(this.form.email)) {
                this.errors.email = true;
                this.emailError = '請輸入正確的信箱格式';
            } else {
                this.errors.email = false;
            }

            // 驗證密碼長度
            if (!this.form.password) {
                this.errors.password = true;
                this.passwordError = '密碼為必填欄位';
            } else if (!formValid.validatePassword(this.form.password)) {
                this.errors.password = true;
                this.passwordError = '密碼至少6位元';
            } else {
                this.errors.password = false;
            }

            // 驗證確認密碼是否一致
            if (!this.form.confirmpassword) {
                this.errors.confirmpassword = true;
                this.confirmPasswordError = '再次輸入密碼為必填欄位';
            } else if (!formValid.validateConfirmPassword(this.form.password, this.form.confirmpassword)) {
                this.errors.confirmpassword = true;
                this.confirmPasswordError = '與密碼不相同';
            } else {
                this.errors.confirmpassword = false;
            }

            // 驗證電話號碼長度是否符合規則
            if (!this.form.phonenumber) {
                this.errors.phonenumber = true;
                this.phonenumberError = '手機號碼為必填欄位';
            } else if (!formValid.validatePhoneNumber(this.form.phonenumber)) {
                this.errors.phonenumber = true;
                this.phonenumberError = '手機號碼為10位數唷';
            } else {
                this.errors.phonenumber = false;
            }

            if (this.errors.username || this.errors.password || this.errors.confirmpassword || this.errors.email || this.errors.phonenumber || this.errors.verification) {
                return;
            }

            if (!this.iAgree) {
                Swal.fire({
                    title: "條款必須同意唷",
                    text: "請確認條款內容並點擊打勾即可進行註冊。",
                    icon: "warning"
                });
            } else {
                Swal.fire({
                    title: '註冊成功！',
                    icon: 'success',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    this.$router.push({
                        path: '/registercomplete'
                    });
                });

                this.generateRandomCode();
            }         
            },

            clearError(field) {
                this.errors[field] = false;
            }
        },

    }
</script>

<style scoped>
.logo-img {
    margin-bottom: 10px;
}

.required {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    border-radius: 50%;
    background-color: #f66;
}

main {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 20px 0;
}

h1 {
    font-size: 28px;
    font-weight: bold;
    color: #fd0;
    margin: 0;
}

.title-img {
    width: 100%;
    height: 40px;
    margin-top: -15px;
    margin-bottom: 20px;
}

.numIcon {
    position: relative;
    height: 3px;
    width: 80%;
    left: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.0001) 0%, rgba(255, 255, 255, 0.3) 49.89%, rgba(255, 255, 255, 0.0001) 100%);
    margin: 20px 0;
}

.num1,
.num2 {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 50%;
    font-weight: bold;
    margin: 0 15px;
}

.num1 {
    font-size: 30px;
    width: 50px;
    height: 50px;
    background-color: #078;
}

.num2 {

    font-size: 18px;
    width: 30px;
    height: 30px;
    background-color: #000;
}

.register-container {
    background: #000;
    border: 1px solid #078;
    border-radius: 5px;
    width: 90%;
    max-width: 760px;
    margin: 20px auto;
    padding: 20px;
}

p.title {
    color: white;
    text-align: center;
    margin: 30px;
}

.icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    gap: 20px;
}

.icon-box img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
}

.p-line {
    color: #fff;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
}

.p-line::after,
.p-line::before {
    content: "";
    position: absolute;
    height: 1px;
    width: 230px;
    margin: 10px;
    background-color: #a0a0a0;
}

.p-line::after {
    right: 0;
}

.p-line::before {
    left: 0;
}

.form-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    gap: 10px;
}

.form-group {
    position: relative;
    flex: 1 1 45%;
    min-width: 200px;
    margin-bottom: 3rem;
}

.form-group label {
    color: #fff;
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #00ffff;
    border-radius: 5px;
    background-color: #333;
    color: white;
    outline: none;
}

input:focus {
    box-shadow: 0 0 3px 2px #0ff;
}

div .verification {
    display: flex;
    flex-wrap: nowrap;
}

div .verification-code input {
    border-radius: 5px 0 0 5px;
}

.form-group .code {
    padding: 10px 15px;
    background-color: #fff;
    color: red;
    border: 1px solid #fff;
    border-radius: 0 5px 5px 0;
    font-size: 16px;
}

.iAgree {
    display: flex;
    flex: 1 1 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    margin-top: 20px;
    text-align: left;
    color: #00ccff;
}

.iAgree span {
    color: #f8a;
}

.iAgree label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    font-size: 14px;
    color: #ffffff;
}

.iAgree label:before {
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

.iAgree input[type=checkbox] {
    display: none;
}

.iAgree input[type=checkbox]:checked+label::before {
    content: '✓';
    display: inline-block;
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    background-color: rgb(0, 199, 217);
    box-shadow: 0px 0px 5px #00ccff;
}

.confirm-button {
    background: linear-gradient(180deg, #666666 0%, #000000 100%);
    color: #fff;
    width: 136px;
    text-align: center;
    padding: 20px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #fff inset;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
    transition: transform 0.2s ease;
}

.confirm-button:hover {
    transform: scale(1.05);
}

/* 小螢幕調整：單欄佈局 */
@media (max-width: 768px) {
    .form-group {
        flex: 1 1 100%;
    }

    .form-group input {}

    .register-container {
        width: 80%;
        padding: 10px;
    }

    .p-line::after,
    .p-line::before {
        width: 40%;
        margin: 0;
    }
}
</style>