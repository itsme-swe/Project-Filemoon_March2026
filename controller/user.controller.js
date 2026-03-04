const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    await UserModel.create(req.body);
    res.status(201).json({ message: "User registered successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const isLogin = bcrypt.compareSync(password, user.password);

    if (!isLogin) return res.status(401).json({ message: "Invalid Password" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
};
