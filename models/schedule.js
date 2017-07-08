module.exports = function (sequelize, DataTypes) {
    var Schedule = sequelize.define("Schedule", {
        trip:DataTypes.STRING,
        recurring: DataTypes.STRING,
        recurringDay: DataTypes.STRING,
        passengers: DataTypes.INTEGER,
        vehicleType: DataTypes.STRING,
        addressA: DataTypes.STRING,
        dayA: DataTypes.STRING, 
        timeA: DataTypes.STRING,
        addressB:  DataTypes.STRING,
        dayB: DataTypes.STRING,
        timeB: DataTypes.STRING,
        pickUpMin:DataTypes.STRING,
        dropOffMin: DataTypes.STRING,
        cost:DataTypes.STRING
    });
            
               Schedule.associate= function (models) {
                    // A User (foreignKey) is required or a Schedule can't be made
                    Schedule.belongsTo(models.User, {
                        foreignKey: "UserID"
                    });
                }
        
        
    return Schedule;
};

