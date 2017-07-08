var db = require("../models");

module.exports = function (app) {

    //do i need app.get?
    // app.get("/api/newUser", function (req, res) {
    //     db.User.findAll({}).then(function (dbUser) {
    //         res.json(dbUser);
    //     });
    // });

    app.post("/api/newUser", function (req, res) {
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body, address,
            city: req.body.address,
            state: req.body.state,
            zip: req.body.zip,
            phone: req.body.phone,
            creditCard: req.body.creditCard,
            email: req.body.email,
            password: req.body.password

        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

};