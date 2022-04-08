const Order = require("../../models/order");
const OrderDetail = require("../../models/orderDetail");

module.exports = async (req, res) => {
  const { id } = req.user;

  try {
    const orderDetails = await OrderDetail.findAll({
      where: { userId: id },
      include: Order,
    });

    const orders = await Order.findAll({
      where: { userId: id },
    });

    return res.status(200).json({ success: true, orderDetails, orders });
  } catch (error) {
    console.log("Cannot fetch your orders", error);
    return res.status(500).json({
      success: true,
      message: "Cannot fetch your orders. Internal server error",
    });
  }
};
