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

userSchema.pre("save", async function () {
  const count = await model("User").countDocuments({ mobile: this.mobile });

  if (count > 0) {
    throw new Error("Mobile number already exist");
  }
});

userSchema.pre("save", async function () {
  const count = await model("User").countDocuments({ email: this.email });

  if (count > 0) {
    throw new Error("Email already exist");
  }
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
