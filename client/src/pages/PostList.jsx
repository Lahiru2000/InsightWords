import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Failed to load posts');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/posts/${id}`);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete post');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>All Posts</h2>

      {posts.length === 0 && <p>No posts found.</p>}

      {posts.map(post => (
        <div
          key={post._id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '20px',
            padding: '20px',
            backgroundColor: '#f9f9f9'
          }}
        >
          <h3 style={{ marginBottom: '10px' }}>{post.title}</h3>
          <p style={{ marginBottom: '10px' }}>{post.description}</p>
          {post.image && (
            <img
              src={`http://localhost:5000/${post.image}`}
              alt="post"
              style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '4px',
                marginBottom: '10px'
              }}
            />
          )}
          <div>
            <button
              onClick={() => handleEdit(post._id)}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                marginRight: '10px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post._id)}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
