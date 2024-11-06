<template>
    <div class="btnLink">
        <router-link class="login_btnLink" to="/Login">Log In</router-link>
        <router-link class="register_btnLink" to="/Register">Register</router-link>
    </div>
</template>

<script>
export default {
    name: 'Home',
    mounted() {
        document.title = "Vue Home";
    }
}
</script>

<style scoped>
.btnLink {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 40px;
    width: 360px;
    height: 38px;
}

.login_btnLink {
    font-family: "Roboto", Arial, sans-serif;
    font-weight: bold;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 38px;
    background: linear-gradient(180deg, #FFDD00 0%, #FF7700 100%);
    border: 1px solid #FFEEAA;
    box-shadow: inset 0px -1px 5px 1px #FFFFFF;
    border-radius: 5px;
    text-decoration: none;
    transition: transform 0.2s ease;
}

.login_btnLink:hover {
    transform: scale(1.05);
}

.register_btnLink {
    font-family: "Roboto", Arial, sans-serif;
    font-weight: bold;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 38px;
    background: linear-gradient(180deg, #55EEFF 0%, #0099AA 100%);
    border: 1px solid #55EEFF;
    box-shadow: inset 0px -1px 5px rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    text-decoration: none;
    transform: scale(1);
    transition: transform 0.2s ease;
}

.register_btnLink:hover {
    transform: scale(1.05);
}
</style>