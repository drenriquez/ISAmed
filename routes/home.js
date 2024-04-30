const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  console.log(process.env)
  res.render('home', { title: 'ISAmed' });
});

module.exports = router;
