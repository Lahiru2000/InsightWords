const Post = require('../models/Post');

exports.createPost = async (req, res, next) => {
  try {
    console.log('Create request body:', req.body);
    console.log('Create request file:', req.file);
    
    // Safely extract values from request body
    const title = req.body?.title || '';
    const description = req.body?.description || '';
    const image = req.file?.path;

    const post = new Post({ title, description, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error('Error creating post:', err);
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
    const updatedFields = { title, description };

    if (req.file) {
      updatedFields.image = req.file.path;
    }

    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      updatedFields,
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
