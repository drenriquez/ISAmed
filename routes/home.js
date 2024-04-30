const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware/userAuth');

/* GET home page. */
router.get('/home',userAuth, function(req, res, next) {
  console.log(process.env)
  res.render('home', { title: 'ISAmed' });
});

module.exports = router;
