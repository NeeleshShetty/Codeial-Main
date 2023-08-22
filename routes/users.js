const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

//we have used the function (passport.checkAuthentication) here only if the sigin
//page is approved it will move to profile page
router.get("/profile/:id", passport.checkAuthentication, usersController.profile);
router.post("/update/:id", passport.checkAuthentication, usersController.update);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

//Sign-out 
router.get("/sign-out", usersController.destroysession);


module.exports = router;
