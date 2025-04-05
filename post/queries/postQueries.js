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

exports.updatePost = async (id, data) => {
  return await Post.findByIdAndUpdate(id, data, { new: true });
};
exports.deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

