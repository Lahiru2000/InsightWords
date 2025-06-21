import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (image) formData.append('image', image);

      await api.post('/posts', formData);
      setMessage('Post created successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
      setImagePreview('');
      
      // Optional: Navigate back to posts list after a short delay
      // setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };  return (
    <div>
      <h2>Create Post</h2>
      {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', minHeight: '100px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={e => {
              setImage(e.target.files[0]);
              // Create a preview if file is selected
              if (e.target.files[0]) {
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
            accept="image/*"
          />
        </div>
        
        {imagePreview && (
          <div style={{ marginBottom: '15px' }}>
            <p>Image Preview:</p>
            <img 
              src={imagePreview} 
              alt="Preview" 
              style={{ maxWidth: '300px', maxHeight: '300px' }} 
            />
          </div>
        )}
        
        <button 
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Create Post
        </button>
        
        <button 
          type="button"
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            marginLeft: '10px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
