const Post = require("../model/postModel");

// Get All Posts
exports.getAllPosts = async () => {
  return await Post.find();
};

// Get Single Post by ID
exports.getPostsById = async (id) => {
  return await Post.findById(id);
};

// Create a New Post
exports.createPost = async (data) => {
  return await Post.create(data);
};

