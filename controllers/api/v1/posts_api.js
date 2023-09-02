const Posts = require("../../../models/posts");
const Comments = require("../../../models/comments");
module.exports.index = async function (req, res) {
  let posts = await Posts.find({})
    .populate("user")
    .populate({
      path: "comment",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
};

//Destroy
module.exports.destroy = async function (req, res) {
  try {
    let post = await Posts.findById(req.params.id);

    //.id means converting object into string
    // if (post.user == req.user.id) {
    //remove the post
    post.remove();

    await Comments.deleteMany({ post: req.params.id });

    return res.json(200, {
      message: "Posts and Comments deleted successfully",
    });
    // } else {
    //   return res.redirect("/");
    // }
  } catch (error) {
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
