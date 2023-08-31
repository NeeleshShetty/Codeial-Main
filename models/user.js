const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const Avatar_path = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatars: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", Avatar_path));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

//static methods
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatars"
);
userSchema.statics.avatarPath = Avatar_path;

const User = mongoose.model("User", userSchema);

module.exports = User;
