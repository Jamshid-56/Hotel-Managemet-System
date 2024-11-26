module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
        roomId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        roomType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pricePerNight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });

    return Room;
};