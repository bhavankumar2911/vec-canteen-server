module.exports = (req, res) => {
  res.clearCookie("token");

  return res
    .status(200)
    .json({ success: true, message: "Logged out suucessfully" });
};
