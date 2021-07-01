const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongo = require('mongodb');
const monk = require('monk');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

/* for local debug
const mp = {
  user: 'appdb_readonly',
  pw: 'passw0rd',
  domain: 'localhost',
  port: '27017',
  name: 'appdb'
}
*/

const mp = {
  user: process.env.mongo_user,
  pw: process.env.mongo_pw,
  domain: process.env.mongo_domain,
  port: process.env.mongo_port,
  name: process.env.mongo_db_name
}
const db = monk(`${mp['user']}:${mp['pw']}@${mp['domain']}:${mp['port']}/${mp['name']}`)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.db = db;
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
