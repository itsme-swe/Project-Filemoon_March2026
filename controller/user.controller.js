const UserModel = require("../model/user.model");

const signup = async (req, res) => {
  try {
    await UserModel.create(req.body);
    res.status(200).json({ message: "User registered successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
};
