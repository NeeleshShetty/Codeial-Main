const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

// update action
module.exports.update = async function (req, res) {
  //to check if the user is matched or signed in to avoid the fiddling with the data
  //   if (req.user.id == req.params.id) {
  //     User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //       return res.redirect("back");
  //     });
  //   } else {
  //     return res.status(401).send("unauthorized");
  //   }

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("**********MULter ERr");
        }
        console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          //this is saving the path of the uploaded file into the avatar field in the user
          user.avatars = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
      });
    } catch (error) {
      return res.redirect("back");
    }
  } else {
    return res.redirect("back");
  }
};

// // render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/sign-in");
  }

  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "SignIn Successfully");
  return res.redirect("/");
};

//signout session
module.exports.destroysession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("error while signing out");
    }
    req.flash("success", "Logout Successfully");
    return res.redirect("/");
  });
};
