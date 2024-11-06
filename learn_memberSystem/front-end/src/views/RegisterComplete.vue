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
            <p>註冊成功</p>
            <span class="back-button" @click="goNext">Return Login</span>
        </div>
    </main>
</template>

<script>
export default {
    name: 'RegisterComplete',
    mounted() {
        document.title = "Register";
    },

    methods: {
        goNext() {
            this.$router.push('/');
        }
    },
}
</script>

<style scoped>
.logo-img {
    margin-bottom: 10px;
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
    font-size: 18px;
    width: 30px;
    height: 30px;
    background-color: #000;
}

.num2 {
    font-size: 30px;
    width: 50px;
    height: 50px;
    background-color: #078;
}

.register-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #000;
    border: 1px solid #078;
    border-radius: 5px;
    width: 90%;
    height: 400px;
    margin: 50px 0 10px 0;
}

.register-container p {
    font-size: 26px;
    color: #fff;
    font-weight: normal;
    margin-bottom: 40px;
}

.back-button {
    width: auto;
    text-align: center;
    padding: 20px;
    background: linear-gradient(180deg, #666666 0%, #000000 100%);
    color: #fff;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #fff inset;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
    transition: transform 0.2s ease;
}

.back-button:hover {
    transform: scale(1.05);
}
</style>