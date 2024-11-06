<template>
    <header>
        <h1>管理員操作系統</h1>
        <div class="user-list">
            <ul class="user-menu">
                <li class="user-toggle" @click.prevent="toggleMenu">
                    <div class="user-name">{{ form.username }}
                    </div>
                    <span class="arrow">&#9662;</span>
                </li>
                <li class="user-content" v-show="isMenuVisible">
                    <div @click.prevent="logOut">Log Out</div>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
export default {
    name: 'memberWelcome',
    mounted() {
        document.title = "MemberSystem";
    },

    computed: {
        query() {
            return this.$route.query;  // 獲取 URL 中的查詢參數
        }
    },

    data() {
        return {
            form: {
                username: this.$route.query.username || '',
                password: this.$route.query.password || '',
                verification: this.$route.query.verification || ''
            },
            selectedOption: this.$route.query.username,
            isMenuVisible: false
        };
    },

    methods: {
        toggleMenu() {
            this.isMenuVisible = !this.isMenuVisible;
        },

        logOut() {
            localStorage.removeItem('username');
            localStorage.removeItem('rememberMe');
            this.form.username = '';
            this.form.password = '';
            this.$router.push('/login');
        }
    },
}
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    padding: 20px 10px;
    top: 0;
    box-shadow: 0 0 5px 5px #000;
}

.user-list {
    position: relative;
    display: inline-block;
}

.user-menu {
    padding: 0;
    margin: 0;
}

.user-name {
    text-align: center;
}

.user-toggle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #000;
    color: white;
    padding: 15px 20px;
    border: 2px solid #00ffff;
    border-radius: 5px;
    width: 200px;
    text-decoration: none;
    font-weight: bold;
    position: relative;
    transition: border 0.3s ease;
    cursor: pointer;
}

.user-toggle:hover {
    border: 2px solid #00ff00;
}

.arrow {
    font-size: 20px;
    color: yellow;
    margin-left: 10px;
    right: 0;
}

/* 下拉選單的樣式 */
.user-content {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #333;
    border: 2px solid #555;
    border-radius: 5px;
    min-width: 200px;
    z-index: 1;
    cursor: pointer;
}

.user-content div {
    display: block;
    padding: 15px;
    color: #ccc;
    text-decoration: none;
    text-align: center;
    transition: background 0.3s ease;
}

.user-content div:hover {
    background-color: #555;
    color: white;
}
</style>