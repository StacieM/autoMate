module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define("User", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstName: {type: Sequelize.STRING, notEmpty: true},
        lastName: {type: Sequelize.STRING, notEmpty: true},
        address: {type: Sequelize.STRING, notEmpty: true},
        city: {type: Sequelize.STRING, notEmpty: true},
        state: {type: Sequelize.STRING, notEmpty: true},
        zip: {type: Sequelize.STRING, notEmpty: true},
        phone: {type: Sequelize.STRING, notEmpty: true},
        creditCard: {type: Sequelize.STRING, notEmpty: true},
        email: {
            type: Sequelize.STRING,
            notEmpty: true,
            validate: {isEmail: true}
        },
        password: {type: Sequelize.STRING, allowNull: false},
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        lastLogin: {type: Sequelize.DATE}
    });
    console.log(User);
    User.associate = function (models) {
        // Associating User with Schedules
        User.hasMany(models.Schedule, {
            foreignKey: 'ScheduleID'
        });
    }
    return User;
};