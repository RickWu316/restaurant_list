# 餐廳清單

此網頁提供各類餐廳詳細資料

## 功能列表

2020/01/17 新增
* 使用者登入功能
* 使用者註冊功能
* 只有指定權限的使用者才能刪除/編輯特定餐廳資料(目前預設創立者才能編輯)

--------------
* 使用者可以新增一家餐廳
* 使用者可以瀏覽一家餐廳的詳細資訊
* 使用者可以瀏覽全部所有餐廳
* 使用者可以修改一家餐廳的資訊
* 使用者可以刪除一家餐廳

## 環境建置
* Node.js v10.15.0
* Express v4.17.1
* Express-handlebars v5.2.0
* body-parser: 1.19.0
* mongoose: 5.11.8
* bcryptjs: 2.4.3
* dotenv: 8.2.0
* passport: 0.4.1
* connect-flash :0.1.1

 

## 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/RickWu316/rstaurant_list.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```shell
cd phrase_creater
```

3. 安裝 npm 套件

```shell
npm install
```

4. 安裝 nodemon 套件

```shell
npm install -g nodemon 
# 若先前在本地開發環境中指令安裝過可跳至下步驟
```

5. 在本地mongoose服務中 新增名為restaurant的database



6. 載入 seeder
```shell
 npm run seed
```

7. 啟動伺服器，執行 app.js 檔案

```shell
nodemon app.js
```

8. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
The Express server is running on http://localhost:3000

```

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始進入網頁

預設帳號資料

user1@example.com /12345678

user2@example.com /12345678
