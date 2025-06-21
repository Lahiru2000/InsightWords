import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple mock login - just redirect to posts list
    console.log('Login attempt with:', formData);
    alert('Login successful! (Mock login)');
    navigate('/posts');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your InsightWords account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-700 placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-700 placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account?{' '}
              <button 
                type="button" 
                className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200 focus:outline-none"
                onClick={() => navigate('/register')}
              >
                Create one here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
