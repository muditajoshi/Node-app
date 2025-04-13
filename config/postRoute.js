const express = require("express");
const { getPosts, createPost,getPostById } = require("../post/controller/postController");
const { validatePost,validateRequest } = require("../middleware/errorMiddleware");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", validatePost,validateRequest, createPost);

module.exports = router;
