const User = require("../../models/user");
const { isInt, trim, isAlphanumeric } = require("validator");
const bcryptjs = require("bcryptjs");

module.exports = async (req, res) => {
  const {
    name,
    registerNumber,
    department,
    username,
    graduationYear,
    password1,
    password2,
  } = req.body;

  if (
    !name ||
    !registerNumber ||
    !department ||
    !username ||
    !graduationYear ||
    !password1 ||
    !password2
  ) {
    return res
      .status(422)
      .json({ success: false, message: "Enter all fields" });
  }

  if (!isInt(registerNumber) || registerNumber.length != 12)
    return res
      .status(422)
      .json({ success: false, message: "Enter a valid register number" });

  if (!isAlphanumeric(username))
    return res.status(422).json({
      success: false,
      message: "Username should contain only alphabets and numbers",
    });

  if (!isInt(graduationYear))
    return res.status(422).json({
      success: false,
      message: "Year of graduation should be a number",
    });

  if (password1 !== password2)
    return res.status(422).json({
      success: false,
      message: "Passwords didn't match",
    });

  // hashing password
  const passwordHash = bcryptjs.hashSync(password2, bcryptjs.genSaltSync(10));

  try {
    const user = await User.create({
      username: trim(username),
      name: trim(name),
      password: passwordHash,
      registerNumber,
      department,
      graduationYear,
    });

    return res
      .status(200)
      .json({ success: false, message: "Account created", user });
  } catch (error) {
    console.log("Cannot create account - Internal server error", error);
    return res.status(200).json({
      success: false,
      message: "Cannot create account - Internal server error",
    });
  }
};
