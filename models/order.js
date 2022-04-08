const dbInstance = require("../db/instance");
const { DataTypes } = require("sequelize");
const { TEXT, FLOAT, BOOLEAN } = DataTypes;
const User = require("./user");

const Order = dbInstance.define("Order", {
  id: {
    type: TEXT,
    primaryKey: true,
    allowNull: false,
  },
  amount: {
    type: FLOAT,
    allowNull: false,
  },
  isClosed: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Order.belongsTo(User, { foreignKey: "userId" });

module.exports = Order;
