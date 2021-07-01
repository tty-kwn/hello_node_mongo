const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  const db = req.db;
  const collection = db.get('users');
  collection.find({},{},(e, docs) => {
    res.render('users', { 'users' : docs });
  });
});

module.exports = router;
