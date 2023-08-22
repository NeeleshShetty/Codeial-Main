const mongoose = require("mongoose");
const commentsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    //comment belongs to a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 'User' DB schema
    },
    //comment belongs to a post
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts", // 'Posts' database Schema
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
