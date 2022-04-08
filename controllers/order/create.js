const { nanoid } = require("nanoid");
const Order = require("../../models/order");
const OrderDetail = require("../../models/orderDetail");

module.exports = async (req, res) => {
  const { cart } = req.body;
  const { id } = req.user;

  //   checking if the cart is an array with atleast 1 product
  if (typeof cart !== "object" || cart.length == 0)
    return res.status(422).json({
      success: false,
      message: "Please select products to place an order",
    });

  // checking if cart item contains all the properties
  let isValid = true;

  cart.forEach((cartItem) => {
    if (
      !cartItem.id ||
      !cartItem.foodName ||
      !cartItem.isAvailable ||
      !cartItem.amount ||
      !cartItem.price ||
      !cartItem.quantity
    )
      isValid = false;
  });

  if (!isValid)
    return res.status(422).json({
      success: false,
      message: "Invalid request. Cannot confirm order",
    });

  // calculating the cart net total
  let total = 0;

  cart.forEach((cartItem) => (total += cartItem.amount));

  // creating an order
  try {
    // storing an order in order table
    const order = await Order.create({
      amount: total,
      userId: id,
      id: nanoid(),
    });

    // storing the order details in details table
    await OrderDetail.bulkCreate(
      cart.map((cartItem) => {
        const { foodName, price, amount, quantity } = cartItem;

        const newCartItem = {
          menuId: cartItem.id,
          foodName,
          price,
          amount,
          quantity,
          orderId: order.id,
          userId: id,
        };

        return { ...newCartItem };
      })
    );

    res.status(200).json({
      success: true,
      message: "Order placed",
      orderId: order.id,
    });
  } catch (error) {
    console.log("Cannot process your order", error);
    res.status(500).json({
      success: false,
      message: "Cannot process your order. Internal server error",
    });
  }
};
