const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res, next) => {
  try {
    console.log('Create request body:', req.body);
    console.log('Create request file:', req.file);
    
    // Safely extract values from request body
    const title = req.body?.title || '';
    const description = req.body?.description || '';
    const image = req.file?.path;

    // Create post with author reference
    const post = new Post({ 
      title, 
      description, 
      image,
      author: req.user._id // Set the authenticated user as author
    });
    
    await post.save();
    
    // Populate author info before sending response
    await post.populate('author', 'username avatar');
    
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });
  } catch (err) {
    console.error('Error creating post:', err);
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search;

    // Build query
    let query = { isPublished: true };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Get posts with pagination
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username avatar');

    // Get total count for pagination
    const total = await Post.countDocuments(query);
    
    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username avatar bio');
    
    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: 'Post not found' 
      });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    res.json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    
    // Find the post first
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: 'Post not found' 
      });
    }

    // Check if user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to update this post' 
      });
    }

    const updatedFields = { title, description };

    if (req.file) {
      updatedFields.image = req.file.path;
    }

    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    ).populate('author', 'username avatar');

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    // Find the post first
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false,
        message: 'Post not found' 
      });
    }

    // Check if user is the author of the post or an admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to delete this post' 
      });
    }

    await Post.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};
