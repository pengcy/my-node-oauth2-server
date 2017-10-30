const User = require('./../models/User');
const oauthMiddlewares = require('./oauthServerMiddleware');

function requiresUser(req, res, next) {
  if (req.session.userId) {
    console.log("req.session.userId", req.session.userId);
    req.user = { id: req.session.userId }
    next();
  } else {
    console.log("Reidrect to login.");
    return res.redirect('/login');
  }
}

function loadUser(req, res, next) {
  User.findOne({ email: req.session.userEmail}, function(err, user) {
    if (err) return next(err);
    res.locals.user = user;
    next();
  });
}

function isValidationError(err) {
  return err && err.name === 'ValidationError';
}


function notFoundHandler(req, res, next) {
  res.status(404);
  res.format({
    html: function() {
      res.render('404', { url: req.url });
    },
    json: function() {
      res.send({ error: 'Not Found' });
    }
  });
}

module.exports.requiresUser = requiresUser;
module.exports.loadUser = loadUser;
module.exports.isValidationError = isValidationError;
module.exports.notFoundHandler = notFoundHandler;
