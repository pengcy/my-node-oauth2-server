var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/oauth2-server");

module.exports.oauth = require('./oauth');
module.exports.User = require('./User');
module.exports.OAuthClientsModel = require('./OAuthClient');
module.exports.mongoose = mongoose;
