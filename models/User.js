module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: DataTypes.STRING,
        lastName:DataTypes.STRING,
        address:DataTypes.STRING,
        city:DataTypes.STRING,
        state: DataTypes.STRING,
        zip:DataTypes.STRING,
        phone: DataTypes.STRING,
        creditCard: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.associate = function (models) {
        // Associating User with Schedules
        User.hasMany(models.Schedule, {
            foreignKey: 'ScheduleID'
        });
    }
    return User;
};