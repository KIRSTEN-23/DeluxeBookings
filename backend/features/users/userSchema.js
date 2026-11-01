const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
      default: "B",
      enum: ["B", "S", "A"], 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);