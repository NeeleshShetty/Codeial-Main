const Comments = require("../models/comments");
const Posts = require("../models/posts");

//  Create(CRUD)
// module.exports.create = function (req, res) {
//   // console.log("reached in the comments controller");
//   Posts.findById(req.body.post, function (err, post) {
//     // console.log("Comment Controller", req.body.content, req.body.post);

//     if (post) {
//       Comments.create(
//         {
//           content: req.body.content,
//           post: req.body.post,
//           user: req.user._id,
//         },
//         function (err, comments) {
//           if (err) {
//             console.log("Error in Commenting");
//           }

//           post.comment.push(comments);
//           post.save();

//           res.redirect("/");
//         }
//       );
//     }
//   });
// };

//ASyncAWAIT

module.exports.create = async function (req, res) {
  try {
    // console.log("reached in the comments controller");
    let post = await Posts.findById(req.body.post);

    if (post) {
      let comment = await Comments.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comment.push(comments);
      post.save();

      res.redirect("/");
    }
  } catch (error) {
    console.log(`Error ${error}`);
    return;
  }
};

// DELete(CRUD)
// module.exports.destroy = function (req, res) {
//   Comments.findById(req.params.id, function (err, comment) {
//     if (comment.user == req.user.id) {
//       let postId = comment.post;

//       comment.remove();
//       Posts.findByIdAndUpdate(
//         postId,
//         { $pull: { comment: req.params.id } },
//         function (err, post) {
//           return res.redirect("back");
//         }
//       );
//     } else {
//       return res.redirect("back");
//     }
//   });
// };

// Async AWAIT
module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comments.findById(req.params.id);

    if (comment.user == req.user.id) {
      let postId = comment.post;

      comment.remove();

      await Posts.findByIdAndUpdate(postId, {
        $pull: { comment: req.params.id },
      });

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log(`Error ${error}`);
    return;
  }
};
