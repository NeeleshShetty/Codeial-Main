const express = require("express");

const router = express.Router();
const passport = require('passport');
const postsApi_controllers = require("../../../controllers/api/v1/posts_api");

router.get("/", postsApi_controllers.index);
//authentication added here
router.delete('/:id',passport.authenticate('jwt', { session: false }), postsApi_controllers.destroy);

module.exports = router;
