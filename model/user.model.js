const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 30,
    },
    mobile: {
      type: String,
      required: true,
      maxlength: 14,
      trim: true,
    },
    email: {
      type: String,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email"],
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
