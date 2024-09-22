const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { title, content, media } = req.body;
  try {
    const post = new Post({
      user_id: req.user.id,
      title,
      content,
      media,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user_id', 'name').sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.addComment = async (req, res) => {
  const { comment } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    const newComment = { user_id: req.user.id, comment };
    post.comments.push(newComment);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    if (post.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
