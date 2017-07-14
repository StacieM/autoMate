var db = require("../models");

module.exports = function (app) {

    app.get("/api/newSchedule", function (req, res) {
        db.Schedule.findAll({}).then(function (dbSchedule) {
            res.json(dbSchedule);
        });
    });

      // Get route for retrieving a single schedule
  app.get("/api/newSchedule/:id", function(req, res) {
    db.Schedule.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbSchedule) {
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
            console.log(`\n\n\n${JSON.stringify(dbSchedule,null,3)}\n\n\n`)
            res.json(dbSchedule);
        });
    });

};
