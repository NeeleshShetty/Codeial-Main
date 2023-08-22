const Posts = require("../models/posts");
const User = require("../models/user");
// module.exports.home = function (req, res) {
// console.log(req.cookies);
// res.cookie('user_id', 25);

//only for the post creation

// Posts.find({}, function (err, posts) {
//     if (err) { console.log("Error in finding posts") };
//     return res.render('home', {
//         title: "Home | Codeial",
//         posts:posts
//     });
// })

//populate the user name or details of the each posts
// module.exports.home = function (req, res) {
//   Posts.find({})
//     .populate("user")
//     .populate({
//       path: "comment",
//       populate: {
//         path: "user",
//       },
//     })
//     .exec(function (err, posts) {
//       if (err) {
//         console.log("Error in finding posts");
//       }
//       User.find({}, function (err, user) {
//         return res.render("home", {
//           title: "Home | Codeial",
//           posts: posts,
//           all_users: user,
//         });
//       });
//     });
// };

//Using Async Await

try {
  module.exports.home = async function (req, res) {
    let posts = await Posts.find({})
      .populate("user")
      .populate({
        path: "comment",
        populate: {
          path: "user",
        },
      });

    let user = await User.find({});

    return res.render("home", {
      title: "Home | Codeial",
      posts: posts,
      all_users: user,
    });
  };
} catch (error) {
  
}

// module.exports.actionName = function(req, res){};
