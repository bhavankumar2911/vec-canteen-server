const Admin = require("../../models/admin");
const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  //   validate username
  if (!validator.isAlphanumeric(username))
    return res.status(422).json({
      success: false,
      message: "Username should contain only alphabets and numbers",
    });

  try {
    const admin = await Admin.findOne({ where: { username } });

    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin doesn't exist" });

    console.log(admin);

    if (!bcrypt.compareSync(password, admin.password))
      return res
        .status(422)
        .json({ success: false, message: "Wrong password" });

    return res.send("logged in");
  } catch (error) {
    console.log("Cannot login admin: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
