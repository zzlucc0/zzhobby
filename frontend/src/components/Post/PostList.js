import React, { useEffect, useState } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:5000/posts');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.media && post.media.map((mediaItem, index) => (
            <img key={index} src={mediaItem.url} alt={mediaItem.type} />
          ))}
          <div>
            {post.comments.map(comment => (
              <p key={comment._id}>{comment.comment}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
