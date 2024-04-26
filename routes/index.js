const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env)
  res.render('index', { title: 'pratArch' });
});

module.exports = router;
