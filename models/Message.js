// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message_content: { type: String, required: true },
  media: {
    type: { type: String },
    url: { type: String },
  },
  sent_at: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model('Message', messageSchema);
