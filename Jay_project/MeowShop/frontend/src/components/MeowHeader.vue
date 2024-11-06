<template>
  <div>
    <header :class="headerClass">
      <img class="logo" src="./icons/LOGO.svg" alt="logo" @click="goHome" />
      <ul>
        <li class="toggle">
          <img class="imgeffect" src="./icons/user.svg" alt="user" @click="selectTab('user')" />
          <UserBlock v-if="selectedTab === 'user'" :selectedTab="selectedTab" @closeUserBlock="getToggle" />
        </li>
        <li class="toggle">
          <img class="imgeffect" src="./icons/shopcard.svg" alt="shopcard" @click="selectTab('cart')" />
          <UserBlock v-if="selectedTab === 'cart'" :selectedTab="selectedTab" @closeUserBlock="getToggle" />
        </li>
        <li class="toggle">
          <img class="imgeffect" src="./icons/find.svg" alt="find" @click="selectTab('search')" />
          <UserBlock v-if="selectedTab === 'search'" :selectedTab="selectedTab" @closeUserBlock="getToggle" />
        </li>
      </ul>
    </header>
    <nav :class="navbarClass">
      <ul class="navbar">
        <li>
          <router-link to="/category">所有產品</router-link>
        </li>
        <li v-for="item in getCategory" :key="item.id">
          <router-link :to="`/${item.category_name}`">{{ item.category_title }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import UserBlock from "@/components/UserBlock.vue";
import { mapState, mapGetters } from "vuex";

export default{
  name: "Headertitle",
  components: {
    UserBlock,
  },
  data() {
    return {
      selectedTab: '',
    }
  },
  computed: {
    ...mapState(['headerLayout', 'navbarLayout']),
    ...mapGetters(['getCategory']),
    headerClass() {
      return this.headerLayout === 'sellercenter' ? 'seller-layout' : 'default-layout';
    },
    navbarClass() {
      return this.navbarLayout === 'sellercenter' ? 'nav-seller' : 'nav-default';
    }
  },
  methods: {
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      } 
    },
    selectTab(tab) {
      this.selectedTab = this.selectedTab === tab ? '' : tab; 
    },
    getToggle(newValue) {
      this.selectedTab = newValue;
    }
  },
}
</script>
<style scoped lang="scss">
// Header - default樣式
.default-layout {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  background: linear-gradient(to top, var(--navbar-color) 100%, transparent 0%);
  background-size: 100% 0%;
  background-repeat: no-repeat;
  background-position: bottom;
  transition: all .5s ease;
  z-index: 2;
  .logo {
    position: relative;
    display: block;
    height: 80%;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.5s ease;
    cursor: pointer;
  }
  ul {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    padding: 10px;
    li {
      padding: 10px;
      img {
        width: 60%;
      }
    }
  }
}
// Header - seller樣式
.seller-layout {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 25%);
  background: linear-gradient(to top, var(--navbar-color) 100%, transparent 0%);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: bottom;
  transition: all .5s ease;
  z-index: 10;
  .logo {
    position: relative;
    display: block;
    height: 80%;
    left: 0;
    transform: translateX(20px);
    transition: all 0.5s ease;
    cursor: pointer;
  }
  ul {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    padding: 10px;

    li {
      padding: 10px;

      img {
        width: 60%;
      }
    }
  }
}

nav {
  position: relative;
  transition: all 0.5s ease;
}
// Navbar - default樣式
.nav-default {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: var(--navbar-color);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 25%);
  opacity: 1;
  .navbar {
    position: relative;
    display: flex;
    flex-direction: row;
    color: var(--font-color);
    justify-content: space-around;
    width: 80%;
    font-size: 24px;
    li {
      margin: 0;
      a,
      a:link,
      a:visited {
        color: var(--font-color);
        text-decoration: none;
        transition: all .3s ease;
        &:hover {
          color: var(--main-color);
        }
      }
    }
  }
}

// Navbar - seller樣式
.nav-seller {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: var(--navbar-color);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 25%);
  transform: translateY(-120px);
  opacity: 0;
  .navbar {
    position: relative;
    display: flex;
    flex-direction: row;
    color: var(--font-color);
    justify-content: space-around;
    width: 80%;
    font-size: 24px;
    li {
      margin: 0;
      a,
      a:link,
      a:visited {
        color: var(--font-color);
        text-decoration: none;
        transition: all .3s ease;
        &:hover {
          color: var(--main-color);
        }
      }
    }
  }
}

.toggle {
  position: relative;
  display: inline-block;
  .imgeffect{
    cursor: pointer;
    transition: all .2s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
  .toggleBox {
    position: absolute;
    right: 0;
    top: 80px;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
}
</style>
