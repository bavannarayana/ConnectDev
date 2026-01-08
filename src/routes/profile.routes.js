const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ValidateEditProfile } = require("../utils/Validator");
const bcrypt = require("bcrypt");
const validator = require("validator");

//Get current profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!ValidateEditProfile(req)) {
      throw new Error("Edit is not allowed");
    }
    const editedProfile = req.user;

    Object.keys(req.body).forEach(
      (key) => (editedProfile[key] = req.body[key])
    );

    await editedProfile.save();

    res.json({ message: "User updated successfully", data: editedProfile });
  } catch (error) {
    res.status(404).send("Error: " + error.message);
  }
});

profileRouter.patch("/profile/updatePassword", userAuth, async (req, res) => {
  try {
    const validPassword = validator.isStrongPassword(req.body.password);
    if (validator.isStrongPassword) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.user.password = hashedPassword;
      req.user.save();
      res.send("Updated");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = profileRouter;
