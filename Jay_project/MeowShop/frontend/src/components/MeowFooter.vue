<template>
  <footer>
    <div class="content">
      <div class="contentMsg">
        <span>官方客服：@meowcute</span>
        <span>官方專線：0800987987</span>
        <span>聯絡時間：8:00 - 16:00</span>
      </div>
      <div class="linkIcon">
        <ul>
          <li><img src="./icons/facebook.svg" alt="facebook"></li>
          <li><img src="./icons/instagram.svg" alt="instagram"></li>
          <li><img src="./icons/twitterx.svg" alt="twitter"></li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      Copyright © 2024 Jay
    </div>
  </footer>
</template>
<script>
</script>
<style scoped lang="scss">

footer {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  background-color: var(--main-color);
  .content {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    .contentMsg {
      display: flex;
      flex-direction: column;
      margin-right: 2rem;
      span {
        display: block;
        padding: 1rem;
      }
    }
    .linkIcon {
      margin-left: 2rem;
      ul {
        display: flex;
        flex-direction: row;
        li {
          margin: 10px;
          img {
            width: 50px;
            height: 50px;
          }        
        }
      }
    }
  }
  
  .copyright {
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
  }
}
</style>