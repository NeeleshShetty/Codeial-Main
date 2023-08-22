const Posts = require("../models/posts");
const Comments = require("../models/comments");

// create (CRUD)
// module.exports.create = function (req, res) {
//   Posts.create(
//     {
//       content: req.body.content,
//       user: req.user._id,
//     },
//     function (err) {
//       if (err) {
//         console.log("Error in creating the post");
//         return;
//       }
//       return res.redirect("back");
//     }
//   );
// };

//ASync await
module.exports.create = async function (req, res) {
  try {
    await Posts.create({
      content: req.body.content,
      user: req.user._id,
    });

    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

// DELETE(CRUD)
// module.exports.destroy = function (req, res) {
//   Posts.findById(req.params.id, function (err, post) {
//     //.id means converting object into string
//     if (post.user == req.user.id) {
//       //remove the post
//       post.remove();

//       Comments.deleteMany({ post: req.body.id }, function (err) {
//         return res.redirect("/");
//       });
//     } else {
//       return res.redirect("/");
//     }
//   });
// };

//async await
module.exports.destroy = async function (req, res) {
  try {
    let post = await Posts.findById(req.params.id);

    //.id means converting object into string
    if (post.user == req.user.id) {
      //remove the post
      post.remove();

       await Comments.deleteMany({ post: req.body.id });

      return res.redirect("/");
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};
