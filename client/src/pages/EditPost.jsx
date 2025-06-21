import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api.js';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="relative max-w-4xl mx-auto px-6 py-12 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-3xl">✏️</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Edit Post
          </h2>
          <p className="text-slate-600 text-lg">
            Update your insights and share your refined thoughts
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className="mb-8 p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.08 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-red-700 font-medium">{message}</p>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/50">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
          
          <div className="relative p-8 lg:p-12">
            <form onSubmit={handleUpdate} className="space-y-8">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-slate-700 font-semibold text-lg">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>Post Title</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full px-6 py-4 text-lg border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-slate-50/50 hover:bg-white focus:bg-white shadow-sm"
                  placeholder="Enter your post title..."
                />
              </div>

              {/* Description Textarea */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-slate-700 font-semibold text-lg">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  <span>Description</span>
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  rows="6"
                  className="w-full px-6 py-4 text-lg border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-slate-50/50 hover:bg-white focus:bg-white shadow-sm resize-none"
                  placeholder="Share your thoughts and insights..."
                />
              </div>

              {/* Current Image Display */}
              {currentImage && (
                <div className="space-y-4">
                  <label className="flex items-center space-x-2 text-slate-700 font-semibold text-lg">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Current Image</span>
                  </label>
                  <div className="relative overflow-hidden rounded-xl bg-slate-100 p-4">
                    <img
                      src={`http://localhost:5000/${currentImage}`}
                      alt="current"
                      className="w-full max-w-md mx-auto rounded-lg shadow-lg object-cover"
                    />
                  </div>
                </div>
              )}

              {/* File Input */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-slate-700 font-semibold text-lg">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Update Image {!currentImage && "(Optional)"}</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setNewImage(e.target.files[0])}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors duration-300"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-2 text-sm text-purple-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-purple-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                  </label>
                  {newImage && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 text-sm">✅ New image selected: {newImage.name}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Update Post</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 px-6 py-3 text-slate-600 hover:text-purple-600 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Posts</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
