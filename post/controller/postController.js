const Post = require("../model/postModel");
const postQueries = require("../queries/postQueries")

const getPosts = async (req,res) => {
    try {
        const posts = await postQueries.getAllPosts()
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ message: "Server Error" });
      }
};

const createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
      }
  
      const newPost = await postQueries.createPost({ title, content });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports = { getPosts, createPost };
