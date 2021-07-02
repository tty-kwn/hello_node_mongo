# hello_node_mongo

1. 最低限環境作成
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

2. IKS用 YAML作成
IKS へのデプロイは以下の手順
* IKSクラスタ作成
* ibmcloud ログイン
* kubectl apply -f mongo_secret.yml
* kubectl apply -f mongodb-statefulset.yml
* kubectl exec -it pod/mongo-0 -- sh
  * mongo admin -u admin -p passw0rd
  * app/mk_testdata_and_user を貼り付け(mongo アプリユーザとデータの登録)
* kubectl apply -f nodeap-deployment.yml
* kubectl get svc して service/nodeap のポート番号（3000:*****/TCP という文字列の*****の部分, 30000番台）を記憶
* ibmcloud ks cluster get --cluster <クラスタ名> で Ingress サブドメイン をコピー
* http://<Ingressサブドメイン>:<ポート番号>/helloworld で「こんにちわ、世界！」と表示されれば成功
* http://<Ingressサブドメイン>:<ポート番号>/users でユーザ一覧っぽいのが取れれば、mongo接続も確認OK
