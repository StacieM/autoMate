var express = require("express");
var session = require('express-session');
var passport = require('passport');
var bodyParser = require("body-parser");
var passport = require('passport');

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app, passport);
require("./routes/schedule-api-routes.js")(app);
require('./config/passport.js')(passport, db.User);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});