const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* GET Hello World Page. */
router.get('/helloworld', (req, res) => {
  res.render('helloworld', { title: 'こんにちわ、世界！' });
})

module.exports = router;
