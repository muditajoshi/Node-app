const express = require("express");
const { getPosts, createPost } = require("../post/controller/postController");
const { validatePost,validateRequest } = require("../middleware/errorMiddleware");

const router = express.Router();

router.get("/", getPosts);
router.post("/", validatePost,validateRequest, createPost);

module.exports = router;
