var User = require('./../models/User');

module.exports.create = function(req, res, next) {
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    console.log(req.body.email + " " + req.body.password);

    if (err) {
      console.log(err);
      return next(err);
    }

    if (user) {
      console.log("Adding user to session: " + user);
      var userObj = user.toJSON();
      req.session.userId = userObj._id;
      req.session.userEmail = userObj.email;
      var redirect = '/account';
      
      console.log("redirectUri: " + req.body.redirectUri);
      if (req.body.redirectUri) {
        // redirect = '/' + req.query.redirect + '?redirect_uri=' + req.query.redirect_uri + '&client_id=' +
        // req.query.client_id;
        redirect = req.body.redirectUri;
      }

      res.redirect(redirect);
    } else {
      res.status(401).render('login');
    }
  });
};

module.exports.login = function(req, res, next) {
  if (req.session.userId) {
    res.redirect('/account');
    return;
  }
  
  var redirect="";
  if (req.query.redirect) {
    var redirect = req.query.redirect +'?redirect_uri=' + req.query.redirect_uri + '&client_id=' +
    req.query.client_id;
  }
  console.log(redirect);
  res.render('login', {redirectUri: redirect});
};
