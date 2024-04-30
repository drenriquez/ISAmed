const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware/userAuth');

/* GET login page. */
router.get(['/', '/login'], function(req, res, next) {
  res.render('login', { title: 'ISAmed' });
});

/* POST login form submission. */
router.post('/login', userAuth, function(req, res, next) {
  // Se il middleware userAuth ha autorizzato l'utente, esegui il reindirizzamento alla homepage
  res.redirect('/home');
});

module.exports = router;
