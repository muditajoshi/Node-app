const Post = require("../model/postModel");
const postQueries = require("../queries/postQueries");
const { body, validationResult } = require("express-validator");


// const errorReturn=(request,response)=>{
//   const errors = validationResult(request);
//   if (!errors.isEmpty()) {
//     console.log("1")
//     return response.status(400).json({ errors: errors.array() });
//   }
// }
const getPosts = async (request, response) => {
  try {
    const posts = await postQueries.getAllPosts();
    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
};

const getPostById = async (request, response) => {
  try {
    const post = await postQueries.getPostById(request.params.id);
    if (!post) return response.status(404).json({ message: "Post not found" });
    response.status(200).json(post);
  } catch (error) {
    response.status(500).json({ message: error.message });
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
    const newPost = await postQueries.createPost({ title, content, image });
    const id = newPost._id.toHexString();
    response.status(200).json(id);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const updatePost = async (request, response) => {
  try {
    const { title, content, image } = request.body;
    const errors = validationResult(request);
    const updatedPost = await postQueries.updatePost(request.params.id, {
      title,
      content,
      image,
    });
    if (!updatedPost)
      return response.status(404).json({ message: "Post not found" });

    response.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const deletePost = async (request, response) => {
  try {
    const deletedPost = await postQueries.deletePost(request.params.id);
    if (!deletedPost)
      return response.status(404).json({ message: "Post not found" });

    response.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
