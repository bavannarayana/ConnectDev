const mongoose = require("mongoose");
const valiadator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!valiadator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
    },
    age: { type: Number },
    skills: {
      type: Array,
      validate(value) {
        if (value.length < 3) {
          throw new Error("Minimum 3 skills required!");
        } else if (value.length > 5) {
          throw new Error("Cannot exceed 5 skills!");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.setJWT = async function () {
  const token = await jwt.sign({ id: this._id }, "connectDev@backend", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const passwordHash = await bcrypt.compare(password, this.password);
  return passwordHash;
};

module.exports = mongoose.model("User", userSchema);
