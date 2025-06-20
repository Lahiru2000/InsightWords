const express = require('express');
const router = express.Router();
const {
  createPost, getPosts, getPostById, updatePost, deletePost
} = require('../controllers/postController');
const upload = require('../middleware/upload');

router.get('/', getPosts);
router.post('/', upload.single('image'), createPost);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
