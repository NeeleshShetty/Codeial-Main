const express = require("express");

const router = express.Router();

const postsApi_controllers = require("../../../controllers/api/v1/posts_api");

router.get("/", postsApi_controllers.index);
router.delete('/:id', postsApi_controllers.destroy);

module.exports = router;
