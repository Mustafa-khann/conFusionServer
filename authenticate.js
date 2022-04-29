var passport = require(passport);
var localStrategy = require(passport-local);
var User = require('./models/user');

exports.local = passport.use(new localStrategy(User.authenticate()));

module.exports = authenticate;