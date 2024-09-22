// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  media: [{
    type: { type: String },
    url: { type: String },
  }],
  comments: [{
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String },
    created_at: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
