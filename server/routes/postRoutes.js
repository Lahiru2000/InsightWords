const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');
const upload = require('../middleware/upload');

// GET all posts
router.get('/', getPosts);

// CREATE new post (with image upload)
router.post('/', upload.single('image'), createPost);

// GET single post by ID
router.get('/:id', getPostById);

// UPDATE post (with optional new image)
router.put('/:id', upload.single('image'), updatePost);

// DELETE post
router.delete('/:id', deletePost);

module.exports = router;
