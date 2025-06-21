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
const { protect, optionalAuth } = require('../middleware/auth');

// GET all posts (public, but with optional auth for user-specific data)
router.get('/', optionalAuth, getPosts);

// GET single post by ID (public, but with optional auth)
router.get('/:id', optionalAuth, getPostById);

// CREATE new post (protected - requires authentication)
router.post('/', protect, upload.single('image'), createPost);

// UPDATE post by ID (protected - requires authentication)
router.put('/:id', protect, upload.single('image'), updatePost);

// DELETE post by ID (protected - requires authentication)
router.delete('/:id', protect, deletePost);

module.exports = router;
