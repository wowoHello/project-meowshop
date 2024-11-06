# 程式實作紀錄
![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 03 更新項目 
`src/app_dbserver.js`：啟動伺服器。  
`src/app_crud.js`：伺服器ＣＲＵＤ功能。  
> 安裝及使用套件：  
> Node.js：跨平台 JavaScript 執行環境。  
> Nodemon：自動監聽並重啟應用程式。  
> Express：Node.js 的 Web 應用框架。  
> mysql2：用來與 MySQL 資料庫進行連線與互動的套件，它是 mysql 的升級版。  

![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 04 更新項目
`/asset`：存放ＣＳＳ。  
`/img`：存放圖片。  
`sonar-project.properties`：SonarQube設定檔。

    登入頁面切版完成。

![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 05 更新項目
`jsconfig.json`：自定義資料夾別名與排除目錄。  
`src/main.js`：入口文件。  
`src/App.vue`：起始的Vue頁面。  
`/router`：新增router資料夾設置router。  
`/view`：新增views資料夾放置Vue頁面。  
`/router/index.js`：設置所有頁面的路徑。  
`/view/Home.vue`：首頁頁面。  
`/view/Login.vue`：登入頁面。  
> 安裝及使用套件：  
> vue：Vue2.7.16版。  
> vue-router：路由套件。  
> vue/cli-service：執行開發、構建、測試和其他與項目管理相關。  
> sass：用來編譯 SCSS。  
> sass-loader：用來處理 .scss 或 .sass 文件。  

    將原本的html與css導入vue2。
    將css拆分為全局樣式(all.scss)與局部樣式(Login頁面專用樣式)
    利用vue-router建立路由。

![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 07 更新項目
`/view/Register.vue`：註冊頁面  
`/view/RegisterComplete.vue`：註冊成功頁面  
`/view/memberWelcome.vue`：登入後頁面  

    進行頁面切版。
    調整RWD。

![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 08 更新項目
    調整表單驗證功能。

![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 13 更新項目
    優化介面。
    修復登入驗證。
    將後端資料另存至backend資料夾。

![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 14 更新項目
    準備進行專題專案：Meow購物網站
    資料整理

![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 16 更新項目
`learn_memberSystem`：練習ＣＲＵＤ會員登入。  
`Jay_prject`：實習專題。  

    資料夾分類。
    進行前端切版。  

![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 17 更新項目
    登入、註冊頁面切版。
    商品類別頁面切版。

![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 21 更新項目
**<font color=#008000>frontend：</font>** 

    產品組件化。
    使用者視窗功能（判斷登入前和登入後）。
    導入vuex狀態管理。

**<font color=#0000FF>backend：</font>**

    使用者註冊及登入功能。
    bcrypt將密碼進行加密。


![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 22 更新項目
**<font color=#008000>frontend：</font>**

    是否有勾選「保持登入」，判斷將token存在localstorage還是sessionstorage
    vuex狀態判斷，若為登入則取出會員資料放至state供調用。
    UserBlock的bug修復。

**<font color=#0000FF>backend：</font>**

    解析 token 後至取得對應的使用者資料。


![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 10 / 28 更新項目
**<font color=#008000>frontend：</font>**

    修改會員資料。
    修改密碼。
    進入賣場中心的動態變化。
    產品連結資料庫。

**<font color=#0000FF>backend：</font>**

    取得分類資料。
    取得分類內產品資料。

![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 11 / 03 更新項目
**<font color=#008000>frontend：</font>**

    修復部分bug。
    完善header購物車圖標功能。
    切版購物車頁面。
    更新賣場中心title的動態效果。
    「加入收藏」動態效果。

**<font color=#0000FF>backend：</font>**

    建立驗證token中間件。

![calendar](./learn_memberSystem/front-end/src/img/calendar.png)  
### 2024 / 11 / 04 更新項目
    最後一次上傳。