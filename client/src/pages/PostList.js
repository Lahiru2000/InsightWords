import { useEffect, useState } from 'react';
import api from '../services/api';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      {posts.map(post => (
        <div key={post._id} style={{ border: '1px solid gray', margin: '10px' }}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          {post.image && (
            <img
              src={`http://localhost:5000/${post.image}`}
              alt="post"
              width="200"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;
