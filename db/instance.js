const { Sequelize } = require("sequelize");

const instance = new Sequelize(
  {
    host: "localhost",
    username: "root",
    password: "",
    database: "vec-canteen",
    dialect: "mariadb",
  }
  // { logging: false }
);

module.exports = instance;
