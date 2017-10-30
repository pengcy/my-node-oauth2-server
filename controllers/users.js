const User = require('./../models/User');
const bcrypt = require('bcrypt');

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}


module.exports.createUser = (req, res) => {
    console.log("Creating a new user, email: " + req.body.email + " password: " + req.body.password);
	var hashed_password = hashPassword(req.body.password);
	const user = new User({'email': req.body.email, 'hashed_password': hashed_password});
    console.log("Creating a new user: " + user);

	user.save()
		.then(() => res.json({ id: user._id }))
		.catch(err => res.send(err));
};


module.exports.getUser = (req, res) => {
	// User.findOne({ email: req.session.userEmail}, function(err, user) {
 //    	if (err) return next(err);
 //    	res.json(user);
	// });

	console.log("getUser", req.user.user);
	if (req.user && req.user.user && req.user.user._id && req.user.user.email) {
	    res.json({"id": req.user.user._id, "email": req.user.user.email});
	} else {
		res.send(404);
	}
};

module.exports.showUserAccount = (req, res) => {
	User.findOne({ email: req.session.userEmail}, function(err, user) {
    	if (err) return next(err);
    	console.log("Showing user account>>>" + user);
    	res.render('account', { user: user.toJSON() });
	});
};

