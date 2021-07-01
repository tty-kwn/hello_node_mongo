# hello_node_mongo

```
brew install mongodb mongodb-conpass
```

下記ベースにアプリ作成
https://qiita.com/hairui/items/5e3c4de1f7e9dbf14d16

```
npm install express -g
npm install express-generator -g

express app
cd app
npm install
cd ..
vi app/index.js
vi views/helloworld.jade
cd app
npm install mongodb monk
mkdir data
mongod --dbpath ./data 
mongodb-conpassにてlocalhostに接続、appdbを作成
mongo
 use appdb
 db.usercollection.insert({"user":"user1","e-mail":"user1@gmail.com"})
vi app.js
```
