const express = require("express");
const authRouter = express.Router();
const { ValidateEditProfile } = require("../utils/Validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Signup API
authRouter.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, email, age, skills, password } = req.body;
    ValidateEditProfile(req);
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      age,
      skills,
      password: passwordHash,
    });

    await user.save();
    res.send("User saved successfully");
  } catch (error) {
    // Duplicate email error
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    res.status(500).send(error.message);
  }
});

// Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid credentials!");
    }
    const passwordDecrypt = await user.validatePassword(password);

    if (passwordDecrypt) {
      const jwtToken = await user.setJWT();
      res.cookie("connectDev", jwtToken);
      res.send("Login successfull!");
    } else {
      throw new Error("Invalid credentials!");
    }
  } catch (error) {
    res.status(404).send("Something went wrong");
  }
});

// Logout API
authRouter.post("/logout", (req, res) => {
  res
    .cookie("connectDev", null, {
      expires: new Date(Date.now()),
    })
    .send("Logout successful");
});

module.exports = authRouter;
