// var db = require("../models");
var authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport) {
    app.get('/api/newUser', authController.signup);

    app.post('/api/newUser', passport.authenticate('local-signup', {
        successRedirect: '/schedule',
        failureRedirect: '/newUser'
    }));

    app.get('/api/signin', authController.signin);

    app.post('/api/signin', passport.authenticate('local-signin', {
        successRedirect: '/schedule',
        failureRedirect: '/signin'
    }))

    app.get('/schedule', isLoggedIn, authController.schedule);

    app.get('/logout', authController.logout);
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        console.log(isLoggedIn());
        return next();
    res.redirect('/signin');
}