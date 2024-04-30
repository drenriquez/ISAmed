const express = require('express');
const router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'ISAmed' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'ISAmed' });
});
/* POST login form submission. */
router.post('/login', function(req, res, next) {
  // Controlla le credenziali
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    // Credenziali corrette, reindirizza alla homepage
    res.redirect('/home');
  } else {
    // Credenziali errate, reindirizza alla pagina di login con un messaggio di errore
    res.redirect('/');
  }
});

module.exports = router;
