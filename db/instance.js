const { Sequelize } = require("sequelize");

const instance = new Sequelize({
  host: "localhost",
  username: "root",
  password: "",
  database: "vec-canteen",
  dialect: "mysql",
});

module.exports = instance;
