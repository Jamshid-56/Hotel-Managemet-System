const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./hotel.db", // SQLite file
});

module.exports = sequelize;