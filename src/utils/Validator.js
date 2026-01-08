const validator = require("validator");
const ValidateSignUpData = (req) => {
  const { firstName, lastName, email, age } = req.body;
  if (!firstName) {
    throw new Error("First name is required!");
  } else if (firstName.length < 3 || firstName.length > 20) {
    throw new Error("First name should be 4-20 characters");
  }
  if (!lastName) {
    throw new Error("Last name is required!");
  } else if (lastName.length < 3 || lastName.length > 20) {
    throw new Error("Last name should be 4-20 characters");
  }
  if (!email) {
    throw new Error("Email is required!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter valid email address");
  }
  if (!age) {
    throw new Error("Age is required!");
  } else if (age < 0 || age > 110) {
    throw new Error("Enter valid email");
  }
};

const ValidateEditProfile = (req) => {
  const isAllowedFields = ["firstName", "lastName", "age", "skills"];

  const isAllowed = Object.keys(req.body).every((key) =>
    isAllowedFields.includes(key)
  );
  return isAllowed;
};

const ValidateEditPassword = (req) => {
  const password = req.body.password;
  if (password.length <= 8 || password.length > 15) {
    throw new Error("Password length should be 8 - 15");
  }
};

module.exports = {
  ValidateSignUpData,
  ValidateEditProfile,
  ValidateEditPassword,
};
