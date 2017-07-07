module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.INTEGER,
        phone: DataTypes.INTEGER,
        creditCard: DataTypes.INTEGER,
        email:DataTypes.STRING,
        password: DataTypes.STRING,
    });
    return User;
};