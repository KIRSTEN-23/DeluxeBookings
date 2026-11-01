module.exports = (req, res, next) => {
  if (!["S", "A"].includes(req.user?.userRole)) return res.status(403).json({ message: "A seller account is required." });
  next();
};
