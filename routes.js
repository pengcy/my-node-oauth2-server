const oauthMiddlewares = require('./middleware/oauthServerMiddleware');
const middleware = require('./middleware/index');
const usersController = require('./controllers/users');
const clientsController = require('./controllers/clients');
const sessionController = require('./controllers/session');

function initialize(app) {
	app.get('/', middleware.loadUser, function(req, res) {
  		res.render('index');
	});



	app.get('/login', sessionController.login);
	app.post('/session', sessionController.create);



	app.get('/register', function(res, res) {
		res.render('register');
	});
	app.post('/users', usersController.createUser);
	app.get('/users', oauthMiddlewares.authenticate, usersController.getUser);
	app.get('/account', middleware.requiresUser, usersController.showUserAccount);



	app.get('/add-client', middleware.requiresUser, function(req, res) {
		res.render('client-registration');
	});
	app.post('/add-client', middleware.requiresUser, clientsController.createClient);
	app.get('/clients', middleware.requiresUser, clientsController.getClient);



  	app.all('/oauth/token', oauthMiddlewares.token);


	app.get('/oauth/authorize', function(req, res, next) {
	  if (!req.session.userId) {
	    return res.redirect('/login?redirect=' + req.path + '&client_id=' +
	      req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
	  }

	  res.render('authorize', {
	    client_id: req.query.client_id,
	    redirect_uri: req.query.redirect_uri
	  });
	});

	// Handle authorize
	///oauth/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&client_id=my_client_id
	app.post('/oauth/authorize', function(req, res, next) {
	  	if (!req.session.userId) {
	    	return res.redirect('/login?redirect=' + req.path + '&client_id=' +
	      		req.query.client_id +'&redirect_uri=' + req.query.redirect_uri);
	  	}
	    next();
	}, middleware.loadUser, oauthMiddlewares.authorize);


	app.get('/oauth/authorize-by-token', oauthMiddlewares.authorizeByToken);



	app.get('/secure', oauthMiddlewares.authenticate, (req, res) => {
		res.json({ message: 'Secure data' });
	});

}

module.exports = initialize;

