var db = require("../models");

module.exports = function (app) {

    //do i need app.get?
    app.get("/api/newSchedule", function (req, res) {
        db.Schedule.findAll({}).then(function (dbSchedule) {
            res.json(dbSchedule);
        });
    });

    // app.get("/api/newSchedule", function(req, res) {
    app.get("/api/newSchedule/:id", function(req, res) {
        // console.log(`Hit this route ${req.params.id}`);
        db.Schedule.findOne({
          where: {
            // id: 2
            id: req.params.id
          }
        })
        .then(function(dbSchedule) {
            // console.log(`Schedule Object: ${JSON.stringify(dbSchedule, null, 4)}`);      
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
            pickUpMin: req.body.pickupMin,
            dropOffMin: req.body.dropoffMin,
            cost: req.body.cost

        }).then(function (dbSchedule) {
            res.json(dbSchedule);
        });
    });

};