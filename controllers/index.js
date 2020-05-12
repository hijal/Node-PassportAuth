const passport = require('passport');


exports.index = (req, res, next) => {
    res.render("index");
};

exports.register = (req, res, next) => {
    res.render("register");
};

exports.login = (req, res, next) => {
    res.render("login");
};

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
};

exports.signIn = passport.authenticate('local-signIn', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    passReqToCallback: true
});

exports.signUp = passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/register',
    passReqToCallback: true
});

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};