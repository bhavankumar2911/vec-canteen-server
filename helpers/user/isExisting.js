const User = require("../../models/user");
const { Op } = require("sequelize");

module.exports = async (registerNumber, username) => {
  try {
    const user = await User.findOne({
      where: { [Op.or]: [{ registerNumber }, { username }] },
    });

    if (!user) return { existing: false, message: "User doesn't exist" };

    console.log(user);
    console.log(registerNumber, user.registerNumber, username, user.username);

    if (
      user.registerNumber == parseInt(registerNumber) &&
      user.username == username
    )
      return {
        existing: true,
        message: "User with this register number and username already exists",
      };
    else if (user.registerNumber == registerNumber)
      return {
        existing: true,
        message: "User with this register number already exists",
      };
    else return { existing: true, message: "Username is already taken" };
  } catch (error) {}
};
