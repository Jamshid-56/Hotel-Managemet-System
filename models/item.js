module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define("Item", {
        itemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        itemName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pricePerUnit: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantityAvailable: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Item;
};