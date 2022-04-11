const { Op } = require("sequelize");
const Razorpay = require("razorpay");
const { nanoid } = require("nanoid");
const validateCart = require("../../helpers/order/validateCart");
const Menu = require("../../models/menu");

module.exports = async (req, res) => {
  const { cart } = req.body;

  const { isValid, message } = validateCart(cart);
  if (!isValid) return res.status(422).json({ success: false, message });

  // array of food ids in cart
  const foodIdsInCart = cart.map((item) => item.id);

  let totalAmountToBePaid = 0;

  try {
    //   fetching the food from db there are also in cart
    const menu = await Menu.findAll({
      where: {
        id: {
          [Op.or]: [...foodIdsInCart],
        },
      },
    });

    // updating the total amount to be paid by the user
    menu.forEach((menuItem) => {
      cart.forEach((cartItem) => {
        if (cartItem.id == menuItem.id)
          totalAmountToBePaid += cartItem.quantity * menuItem.price;
      });
    });

    // configuring RP

    var RPInstance = new Razorpay({
      key_id: process.env.RP_TEST_KEY_ID,
      key_secret: process.env.RP_TEST_KEY_SECRET,
    });

    // payment specific configurtion
    const RPOptions = {
      amount: totalAmountToBePaid * 100,
      currency: "INR",
      receipt: nanoid(),
    };

    // creating an order
    const RPOrderCreationResult = await RPInstance.orders.create(RPOptions);

    // sending the order id to the client
    return res.status(200).json({
      success: 200,
      orderId: RPOrderCreationResult.id,
      currency: RPOrderCreationResult.currency,
      amount: RPOrderCreationResult.amount,
    });
  } catch (error) {
    console.log("Cannot process payment", error);
    res.status(500).json({
      success: false,
      message: "Cannot process your payment. Internal server error",
    });
  }
};
