var path = require("path");

let body_data = {};
// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });
  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/Contact.html"));
  });

  app.get("/newUser", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/newuser.html"));
  });

  app.get("/schedule", function(req, res) {
    //if login = true, then schedule file loads, otherwise go to another file
    res.sendFile(path.join(__dirname + "/../public/schedule.html"));
  });

   app.get("/signin", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/signIn.html"));
  });

  app.get("/confirmation", function(req, res) {
    res.json(body_data);
  });

  app.post("/confirmation", (req, res) => {
    body_data = req.body;
    // console.log(req.body.id);
    // console.log("HIT");
    res.sendFile(path.join(__dirname + "/../public/confirmation.html"));
  });


};