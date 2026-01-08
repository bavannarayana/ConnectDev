const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { connectDev } = req.cookies;
    if (!connectDev) {
      throw new Error("Invalid credentials");
    }
    const jwtToken = await jwt.verify(connectDev, "connectDev@backend");

    const user = await User.findById(jwtToken.id);
    if (!user) throw new Error("user not found");

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
};
module.exports = {
  userAuth,
};
