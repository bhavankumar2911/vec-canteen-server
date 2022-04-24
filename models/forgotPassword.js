const dbInstance = require("../db/instance");
const { DataTypes } = require("sequelize");
const { TEXT, STRING } = DataTypes;
const User = require("./user");

const ForgotPassword = dbInstance.define(
  "forgot_password",
  {
    resetID: {
      type: TEXT,
      allowNull: false,
      unique: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
  },
  { freezeTableName: true }
);

module.exports = ForgotPassword;
