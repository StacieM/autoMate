module.exports = function (sequelize, DataTypes) {
    var Schedule = sequelize.define("Schedule", {
        trip: DataTypes.STRING,
        recurring: DataTypes.BOOLEAN,
        recurring2:Datatypes.STRING,
        passengers: DataTypes.INTEGER,
        vehicleType: DataTypes.STRING,
        pickUpAdd: Datatypes.STRING,
        pickUpCity: Datatypes.STRING,
        pickUpState: Datatypes.STRING,
        pickUpDay: Datatypes.STRING,
        pickUpTime: Datatypes.STRING,
        dropOffpAdd: Datatypes.STRING,
        dropOffCity: Datatypes.STRING,
        dropOffState: Datatypes.STRING,
        dropOffDay: Datatypes.STRING,
        dropOffTime: Datatypes.STRING
    });
    return Schedule;
};