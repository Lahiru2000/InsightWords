import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCurrentImage(res.data.image);
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to load post');
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (newImage) formData.append('image', newImage);

      await api.put(`/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        {currentImage && (
          <div>
            <p>Current Image:</p>
            <img
              src={`http://localhost:5000/${currentImage}`}
              alt="current"
              width="200"
              style={{ marginBottom: '10px' }}
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={e => setNewImage(e.target.files[0])}
        />

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
