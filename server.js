const express = require('express');
const path = require('path');
const models = require('./models');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieSession = require('cookie-session');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();
const User = models.User;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cookieParser('ncie0fnft6wjfmgtjz8i'));
app.use(cookieSession({
  name: 'session',
  keys: ["fjasgijla284jfao283035jaf"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  if (process.env.NODE_ENV !== 'test')
    console.error('Error:', err);

  if (middleware.isValidationError(err)) {
    res.status(400);
    res.send(err.errors);
  } else {
    res.status(err.code || 500);
    res.send('Error');
  }
});

app.locals.title = 'OAuth 2 Server Example';
app.locals.pretty = true;

routes(app);




app.listen(3000);
console.log("Oauth2 server running on localhost:3000");




