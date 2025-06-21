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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="relative max-w-6xl mx-auto px-6 py-12 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-3xl">📚</span>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            All Posts
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Discover amazing insights, stories, and ideas shared by our community
          </p>
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
              <span className="text-6xl opacity-50">📝</span>
            </div>
            <p className="text-slate-500 text-xl font-medium">No posts found.</p>
            <p className="text-slate-400 mt-2">Be the first to share your insights!</p>
          </div>
        )}        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map(post => (
            <article
              key={post._id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 hover:border-purple-200"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
              
              <div className="relative p-8">
                {/* Post header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 ml-4">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                </div>

                {/* Post image */}
                {post.image && (
                  <div className="relative mb-6 overflow-hidden rounded-xl">
                    <img
                      src={`http://localhost:5000/${post.image}`}
                      alt="post"
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center space-x-4 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => handleEdit(post._id)}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 group/btn"
                  >
                    <svg className="w-5 h-5 transform group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-lg hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300 group/btn"
                  >
                    <svg className="w-5 h-5 transform group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostList;
