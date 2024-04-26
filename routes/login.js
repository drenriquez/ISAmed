const express = require('express');
const router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    console.log(process.env)
    res.render('login', { title: 'ISAmed' });
  });
  

module.exports = router;
