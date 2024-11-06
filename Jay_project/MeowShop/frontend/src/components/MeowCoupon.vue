<template>
  <div class="couponBar">
    <div class="couponContent">
      <h3>選擇優惠券</h3>
      <div class="coupon">
        <div class="use-ticket">
          <p>輸入優惠券代碼</p>
          <input type="text" />
          <button>使用</button>
        </div>
        <div class="coupon-card">
          <div class="card-group">
            <div class="left">
              <font-awesome-icon :icon="['fas', 'paw']" style="font-size: 36px;" />
              <p>喵喵券</p>
            </div>
            <div class="right">
              <p class="coupontxt">5折 最多折NT$ 777</p>
              <p class="time">使用期限：2024/02/29 </p>
            </div>
            <input type="checkbox">
          </div>
          <div class="card-group">
            <div class="left">
              <font-awesome-icon :icon="['fas', 'paw']" style="font-size: 36px;" />
              <p>喵喵券</p>
            </div>
            <div class="right">
              <p class="coupontxt">5折 最多折NT$ 777</p>
              <p class="time">使用期限：2024/02/29 </p>
            </div>
            <input type="checkbox">
          </div>
          <div class="card-group">
            <div class="left">
              <font-awesome-icon :icon="['fas', 'paw']" style="font-size: 36px;" />
              <p>喵喵券</p>
            </div>
            <div class="right">
              <p class="coupontxt">5折 最多折NT$ 777</p>
              <p class="time">使用期限：2024/02/29 </p>
            </div>
            <input type="checkbox">
          </div>
          <div class="card-group">
            <div class="left">
              <font-awesome-icon :icon="['fas', 'paw']" style="font-size: 36px;" />
              <p>喵喵券</p>
            </div>
            <div class="right">
              <p class="coupontxt">5折 最多折NT$ 777</p>
              <p class="time">使用期限：2024/02/29 </p>
            </div>
            <input type="checkbox">
          </div>
        </div>
      </div>
      <div class="couponcheck">
        <button class="cancel" @click="$emit('close')">取消</button>
        <button class="confirm" @click="$emit('close')">確認</button>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style scoped lang="scss">
input[type=checkbox] {
  margin: 20px;
}

input[type=text] {
  appearance: none;
  background-color: #fff;
  border: 1px solid var(--font-color);
  height: 2rem;
  margin: 0 5px;
}

.couponBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .3);
  z-index: 100;
}

.couponContent {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 35vw;
  height: 80vh;
  background: white;
  border: 1px solid var(--font-color);
  border-radius: 10px;
  padding: 20px 0;

  h3 {
    text-align: center;
    width: 100%;
    color: var(--font-color);
    padding-bottom: 20px;
    border-bottom: 1px solid var(--font-color);
  }

  .coupon {
    position: relative;
    width: 90%;

    .use-ticket {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      margin: 20px 0;
      padding: 20px;
      background: var(--navbar-color);
      p {
        flex: 1 1 auto;
        font-weight: lighter;
        color: var(--font-color);
        cursor: default;
      }

      input {
        flex: 2 1 auto;
        height: 2rem;
      }

      button {
        flex: 1 1 auto;
        appearance: none;
        background-color: var(--main-color);
        color: white;
        height: 35px;
        border: none;
        padding: 5px 10px;
        font-weight: bold;
        cursor: pointer;
      }
    }

    .coupon-card {
      overflow: auto;
      height: 45vh;
      .card-group {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        border: 1px solid var(--font-color);
        border-left-style: none;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, .5);

        .left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          color: white;
          background: var(--err-color);

          &::after {
            content: "";
            position: absolute;
            top: 5px;
            left: -5px;
            width: 20px;
            height: 90%;
            border-left: 10px dotted white;
          }

          p {
            padding-top: 10px;
          }
        }

        .right {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: self-start;
          padding: 0 10px;
          color: var(--font-color);

          .coupontxt {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
          }

          .time {
            display: block;
            font-size: 10px;
            height: 100%;
            font-weight: lighter;
          }
        }
      }
    }
  }

  .couponcheck {
    padding-top: 20px;
    margin: 20px;
    width: 100%;
    border-top: 1px solid var(--font-color);
    button {
      padding: 10px 50px;
      margin: 0 5px;
      border: none;
      cursor: pointer;
    }
    .cancel {
      background: var(--navbar-color);
      font-weight: bold;
    }
    .confirm {
      background: var(--main-color);
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>