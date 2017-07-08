var db = require("../models");

module.exports = function (app) {

    //do i need app.get?
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
            pickUpAdd: req.body.pickUpAdd,
            pickUpCity: req.body.pickUpCity,
            pickUpState: req.body.pickUpState,
            pickUpDay: req.body.pickUpDay,
            pickUpTime: req.body.pickUpTime,
            dropOffpAdd: req.body.dropOffpAdd,
            dropOffCity: req.body.dropOffCity,
            dropOffState: req.body.dropOffState,
            dropOffDay: req.body.dropOffDay,
            dropOffTime: req.body.dropOffTime

        }).then(function (dbSchedule) {
            res.json(dbSchedule);
        });
    });

};