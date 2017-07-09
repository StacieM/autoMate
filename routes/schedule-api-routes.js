var db = require("../models");

module.exports = function (app) {

    
    app.get("/api/newSchedule", function (req, res) {
        db.Schedule.findAll({}).then(function (dbSchedule) {
            res.json(dbSchedule);
        });
    });

    app.post("/api/newSchedule", function (req, res) {
        db.Schedule.create({
            trip: req.body.trip,
            recurring: req.body.recurring,
            recurringDay: req.body.recurringDay,
            passengers: req.body.passengers,
            vehicleType: req.body.vehicleType,
            addressA: req.body.addressA,
            dayA: req.body.dayA,
            timeA: req.body.timeA,
            addressB: req.body.addressB,
            dayB: req.body.dayB,
            timeB: req.body.timeB,
            pickUpMin: req.body.pickUpMin,
            dropOffMin: req.body.dropOffMin,
            cost: req.body.cost

        }).then(function (dbSchedule) {
            res.json(dbSchedule);
        });
    });

};