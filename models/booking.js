module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
        customerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rentStartTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rentEndTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return Booking;
};