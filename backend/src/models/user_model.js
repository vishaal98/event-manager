const mongoose = require("mongoose");
const validator = require("validator");
const config = require("../config/config");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: (email) => {
        if (validator.isEmail(email)) return true;
        return false;
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  //use !!user to return falsy values
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
