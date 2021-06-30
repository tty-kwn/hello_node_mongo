var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World Page. */
router.get('/helloworld', (req, res) => {
  res.render('helloworld', { title: 'こんにちわ、世界！' });
})

/* userlist htmlページを作成 */
router.get('/userlist', (req, res) => {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

module.exports = router;
