// src/components/Post/CreatePost.js
import React, { useState } from 'react';
import api from '../../api';

function CreatePost() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/posts', { content });
      setMessage('Post created successfully!');
      setContent('');
    } catch (error) {
      setMessage('Error creating post: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="content"
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreatePost;
