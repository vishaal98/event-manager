const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const User = require("../models/user_model");

const createUser = async (user) => {
  if (await User.isEmailTaken(user.email)) {
    throw new ApiError(httpStatus.CONFLICT, "Email is already taken");
  }
  //   console.log(user);
  let salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash(user.password, salt);
  let newUser = await User.create({
    ...user,
    password: hashedPassword,
  });

  // return newUser;
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    events: newUser.events,
  };
};

const getUserById = async (id) => {
  let user = await User.findOne({ _id: id });
  return user;
};

const getUserByEmail = async (email) => {
  let user = await User.findOne({ email: email });
  return user;
};

const updateUser = async (userId, userData) => {
  const { currentPassword, newPassword } = userData;
  let updateUserData = userData;

  if (currentPassword) {
    let user = await User.findOne({ _id: userId });
    let isPasswordMatch = user.isPasswordMatch(currentPassword);
    if (!isPasswordMatch)
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Current password is incorrect"
      );

    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(newPassword, salt);
    updateUserData = {
      password: hashedPassword,
    };
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: updateUserData },
    { new: true }
  );

  return {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    events: updatedUser.events,
  };
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
};
