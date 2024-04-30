require('dotenv').config();
const fs=require('fs')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const { userAuth, userPerms}=require('./middleware/userAuth');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');//middleware per generare file di log
const rfs = require('rotating-file-stream') // version 2.x
const helmet= require('helmet')// libreria middleware per Node.js che aiuta a proteggere le tue applicazioni Express impostando vari header HTTP correlati alla sicurezza
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const app = express();

app.use(helmet());
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
