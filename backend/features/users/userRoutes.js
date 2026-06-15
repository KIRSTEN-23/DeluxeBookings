const express = require("express");
const router = express.Router();

const verifyToken = require("../../middleware/verifyToken");

const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../../features/users/userController");

router.get("/profile", verifyToken, getUserProfile);
router.put("/update", verifyToken, updateUserProfile);
router.delete("/delete", verifyToken, deleteUserProfile);

module.exports = router;