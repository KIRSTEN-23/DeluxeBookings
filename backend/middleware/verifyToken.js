const jwt = require("jsonwebtoken");
const User = require("../features/users/userSchema");

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Please sign in to continue." });
  let claims;
  try { claims = jwt.verify(header.slice(7), process.env.JWT_SECRET); }
  catch { return res.status(401).json({ message: "Your session has expired. Please sign in again." }); }
  try {
    const user = await User.findById(claims.id).select("_id userRole");
    if (!user) return res.status(401).json({ message: "Please sign in to continue." });
    req.user = { id: user._id.toString(), userRole: user.userRole };
    next();
  } catch { res.status(503).json({ message: "Could not verify your session. Please try again." }); }
};
