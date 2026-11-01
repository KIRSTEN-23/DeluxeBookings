const bcrypt = require("bcrypt");

const User = require("../../features/users/userSchema");
const generateToken = require("../../utils/generateToken.js");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, userRole } = req.body;

    if (!name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "") || !/^[1-6][1-4][1-4]$/.test(password || "")) return res.status(400).json({ error: "Enter your name, a valid email and all three picture choices." });
    if (userRole && !["B", "S"].includes(userRole)) return res.status(400).json({ error: "Choose a customer or seller account." });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      userRole: userRole || "B",
    });

    await user.save();

    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(400).json({ error: err.code === 11000 ? "An account already exists for this email. Please sign in." : "Could not create your account. Please check your details." });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email?.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(400).send("Email or picture password is incorrect.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).send("Email or picture password is incorrect.");
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userRole: user.userRole,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};