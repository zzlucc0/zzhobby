const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');

// Routes
router.post('/create', auth, postController.createPost);
router.get('/', postController.getPosts);
router.post('/:id/comment', auth, postController.addComment);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;
