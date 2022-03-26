const dbInstance = require("../db/instance");
const { DataTypes } = require("sequelize");
const { STRING, INTEGER, TEXT } = DataTypes;

module.exports = dbInstance.define("User", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  registerNumber: {
    type: INTEGER,
    allowNull: false,
    unique: true,
  },
  department: {
    type: STRING,
    allowNull: false,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  graduationYear: {
    type: INTEGER,
    allowNull: false,
  },
  password: {
    type: TEXT,
    allowNull: false,
  },
});
