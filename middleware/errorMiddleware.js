const { body ,validationResult} = require("express-validator");

const notFound = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };

  
const validatePost = [
  body("title").isString().trim().notEmpty().withMessage("Title is required"),
  body("content").isString().trim().notEmpty().withMessage("Content is required"),
  body("image").isString().trim().notEmpty().withMessage("Image is required"),
];


const validateRequest = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() }); // Stops execution if errors exist
  }
  next();
};

  module.exports = { notFound , validatePost,validateRequest};