const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      userRole: user.userRole,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );
};

module.exports = generateToken;