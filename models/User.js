const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  hashed_password: String,
  scope: String
});


UserSchema.static('authenticate', function(email, password, cb) {
  this.findOne({ email: email }, function(err, user) {
    if (err || !user || !user.toJSON().hashed_password) {
      console.log("err>>> " + err);
      return cb(err);
    } 
    console.log("password>>>" + password + "  user.hashed_password>>>" + user.toJSON().hashed_password);
    cb(null, bcrypt.compareSync(password, user.toJSON().hashed_password) ? user : null);
  });
});

module.exports = mongoose.model('User', UserSchema);
