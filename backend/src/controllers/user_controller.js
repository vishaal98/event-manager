const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { userService, eventService } = require("../services");

const getUser = catchAsync(async (req, res) => {
  let userData = await userService.getUserById(req.params.userId);
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (userData.email !== req.user.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User not authorized to view some other user's data"
    );
  }
  res.send(userData);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.user._id, req.body);
  res.send(user);
});

module.exports = {
  getUser,
  updateUser,
};
