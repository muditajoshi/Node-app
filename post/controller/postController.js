const Post = require("../model/postModel");
const DAL = require("../../DAL/postQueries");
const { body, validationResult } = require("express-validator");

const getPosts = async (request, response) => {
  try {

    const posts = await DAL.getAllPosts();
     response.status(200).json(posts);
  } catch (error) {
     response.status(500).json({ error: "Server Error" });
  }
};

const getPostById = async (request, response) => {
  try {
    const post = await DAL.getPostById(request.params.id);
    if (!post) return response.status(404).json({ message: "Post not found" });
    response.status(200).json(post);
  } catch (error) {
   response.status(500).json({ error: error.message });
  }
};

const createPost = async (request, response) => {
  try {
    const { title, content, image } = request.body;
    // const errors = validationResult(request);
    // if (!errors.isEmpty()) {
    //   return response.status(400).json({ errors: errors.array() });
    // }
    // errorReturn(request,response)
    const newPost = await DAL.createPost({ title, content, image });
    const id = newPost._id.toHexString();
    response.status(200).json(id);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const updatePost = async (request, response) => {
  try {
    const { title, content, image } = request.body;
    const errors = validationResult(request);
    const updatedPost = await DAL.updatePost(request.params.id, {
      title,
      content,
      image,
    });
    if (!updatedPost)
      return response.status(404).json({ message: "Post not found" });

    response.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const deletePost = async (request, response) => {
  try {
    const deletedPost = await DAL.deletePost(request.params.id);
    if (!deletedPost)
      return response.status(404).json({ message: "Post not found" });

    response.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
