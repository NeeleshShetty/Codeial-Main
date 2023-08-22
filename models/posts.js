const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    //referring user and posts in the comments schema
    user: {
      type: mongoose.Schema.Types.ObjectId, //refer User DB Schema
      ref: "User",
    },
    //include the arrays of ids of comments in this posts schema itself

    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
