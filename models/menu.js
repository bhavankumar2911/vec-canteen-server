const dbInstance = require("../db/instance");
const { DataTypes } = require("sequelize");
const { STRING, INTEGER, NUMBER, BOOLEAN } = DataTypes;

module.exports = dbInstance.define(
  "menu",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    foodName: {
      type: STRING,
      allowNull: false,
    },
    price: {
      type: NUMBER,
      allowNull: false,
    },
    isAvailable: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);
