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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="relative max-w-4xl mx-auto px-6 py-12 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Create New Post
          </h2>
          <p className="text-slate-600 text-lg">
            Share your insights and inspire others with your story
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-8 p-4 rounded-xl border ${
            message.includes('success') 
              ? 'bg-gradient-to-r from-green-50 to-emerald-100 border-green-200' 
              : 'bg-gradient-to-r from-red-50 to-red-100 border-red-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {message.includes('success') ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.08 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                )}
              </div>
              <p className={`font-medium ${
                message.includes('success') ? 'text-green-700' : 'text-red-700'
              }`}>
                {message}
              </p>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/50">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
          
          <div className="relative p-8 lg:p-12">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
              {/* Title Input */}
              <div className="space-y-2">
                <label htmlFor="title" className="flex items-center space-x-2 text-slate-700 font-semibold text-lg">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>Post Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter an engaging title for your post..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full px-6 py-4 text-lg border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-slate-50/50 hover:bg-white focus:bg-white shadow-sm"
                />
              </div>

              {/* Description Textarea */}
              <div className="space-y-2">
                <label htmlFor="description" className="flex items-center space-x-2 text-slate-700 font-semibold text-lg">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  <span>Description</span>
                </label>
                <textarea
                  id="description"
                  placeholder="Share your thoughts, insights, and ideas in detail..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  rows="8"
                  className="w-full px-6 py-4 text-lg border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-slate-50/50 hover:bg-white focus:bg-white shadow-sm resize-none"
                />
              </div>

              {/* File Input */}
              <div className="space-y-2">
                <label htmlFor="image" className="flex items-center space-x-2 text-slate-700 font-semibold text-lg">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Add Image (Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="image"
                    onChange={e => {
                      setImage(e.target.files[0]);
                      if (e.target.files[0]) {
                        setImagePreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    accept="image/*"
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
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
                  {image && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 text-sm">✅ Image selected: {image.name}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="space-y-4">
                  <label className="flex items-center space-x-2 text-slate-700 font-semibold text-lg">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Image Preview</span>
                  </label>
                  <div className="relative overflow-hidden rounded-xl bg-slate-100 p-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full max-w-md mx-auto rounded-lg shadow-lg object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button 
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Create Post</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-slate-500/25 transform hover:scale-105 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 transform group-hover:-rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            💡 <strong>Tip:</strong> Add an eye-catching title and detailed description to engage your audience
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
