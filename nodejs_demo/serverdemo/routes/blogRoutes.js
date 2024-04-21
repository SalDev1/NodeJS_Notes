const express = require('express');
const Blog = require('../models/blog');
const { getBlogs, createBlog, redirectBlog, getBlogById, deleteBlogById } = require('../controllers/blogController');
const router = express.Router();

router.route('/blogs').get(getBlogs)

// Creating a new blog and injecting it to the database.
router.route('/blogs').post(createBlog)

router.route('/blogs/create').get(redirectBlog)

// Showing the specific blog based on the id that we get from the client side.
router.route('/blogs/:id').get(getBlogById)

// Deleting a blog based on the id.
router.route('/blogs/:id').delete(deleteBlogById)
module.exports = router;
