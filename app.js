require('dotenv').config();
const fs=require('fs')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');//middleware per generare file di log
const rfs = require('rotating-file-stream') // version 2.x
const helmet= require('helmet')// libreria middleware per Node.js che aiuta a proteggere le tue applicazioni Express impostando vari header HTTP correlati alla sicurezza
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // Durata della sessione in millisecondi (1 ora)
}));
// Funzione per eliminare le sessioni scadute
function cleanExpiredSessions() {
  app.locals.sessions.forEach((session, sessionId) => {
    if (session.expires < Date.now()) {
      // Rimuovi la sessione scaduta
      delete app.locals.sessions[sessionId];
    }
  });
}
// Esegui la pulizia delle sessioni scadute ogni minuto
setInterval(cleanExpiredSessions, 60000); // Ogni minuto (60000 millisecondi)

//-------- FFILE DI LOG -create a write stream (in append mode)-------------------------------------
// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs')
})
var accessLogStream = fs.createWriteStream(path.join(__dirname,'logs', 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
//----------------------------------------------------------------------------------------------------
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Servi i file statici dalla cartella 'node_modules'
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use(homeRouter);
app.use(usersRouter);
app.use(loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
