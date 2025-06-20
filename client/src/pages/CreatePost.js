import { useState } from 'react';
import api from '../services/api';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (image) formData.append('image', image);

      const res = await api.post('/posts', formData);
      setMessage('Post created successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
          accept="image/*"
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default CreatePost;
