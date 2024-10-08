import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    if (!token) {
      setMessage('No token found, please login first.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, media }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Post created successfully!');
        navigate('/'); // Redirect to home after post creation
      } else {
        setMessage(data.message || 'Error creating post.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while creating the post');
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <input type="file" multiple onChange={handleMediaUpload} />
        <button type="submit">Create Post</button>
      </form>
      <p>{message}</p>
      <div>
        {media.map((image, index) => (
          <img key={index} src={image} alt="uploaded media" />
        ))}
      </div>
    </div>
  );
}

export default CreatePost;
