const Post = require('../models/Post');

exports.createPost = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.path;

    const post = new Post({ title, description, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};
