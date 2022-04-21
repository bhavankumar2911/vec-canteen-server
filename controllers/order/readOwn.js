const Order = require("../../models/order");
const User = require("../../models/user");
const OrderDetail = require("../../models/orderDetail");

module.exports = async (req, res) => {
  const { id } = req.user;

  try {
    const orders = await Order.findAll({
      where: { userId: id, isClosed: false },
      include: User,
    });

    const orderDetails = await OrderDetail.findAll({
      include: Order,
      where: {
        orderId: [...orders.map((order) => order.id)],
      },
    });

    return res.status(200).json({ success: true, orderDetails, orders });
  } catch (error) {
    console.log("Cannot fetch the orders", error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch your orders. Internal server error",
    });
  }
};
