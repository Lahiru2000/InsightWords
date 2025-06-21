import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
    setIsMenuOpen(false);
  };
  const isActive = (path) => {
    return location.pathname === path 
      ? 'text-purple-600 bg-gradient-to-r from-purple-100 to-blue-100 shadow-md' 
      : 'text-gray-700 hover:text-purple-600';
  };  return (
    <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
            <span className="text-3xl animate-pulse">📝</span>
            <span className="hidden sm:block">InsightWords</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/')} group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md transform hover:scale-105`}
            >
              <span className="text-xl group-hover:animate-bounce">🏠</span>
              <span className="font-medium">Home</span>
            </Link>
            <Link 
              to="/posts" 
              className={`${isActive('/posts')} group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md transform hover:scale-105`}
            >
              <span className="text-xl group-hover:animate-bounce">📚</span>
              <span className="font-medium">Posts</span>
            </Link>            <Link 
              to="/create" 
              className={`${isActive('/create')} group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:shadow-md transform hover:scale-105`}
            >
              <span className="text-xl group-hover:animate-bounce">✏️</span>
              <span className="font-medium">Create</span>
            </Link>
            
            {isAuthenticated ? (
              // Authenticated user menu
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md transform hover:scale-105"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || '👤'}
                  </div>
                  <span className="font-medium text-gray-700">{user?.name}</span>
                  <span className={`transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}>⬇️</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/50 py-2 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span>👤</span>
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/my-posts"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span>📝</span>
                      <span>My Posts</span>
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Non-authenticated user links
              <>
                <Link 
                  to="/login" 
                  className={`${isActive('/login')} group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 hover:shadow-md transform hover:scale-105`}
                >
                  <span className="text-xl group-hover:animate-bounce">🔐</span>
                  <span className="font-medium">Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className={`${isActive('/register')} group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transform hover:scale-105 hover:-translate-y-1`}
                >
                  <span className="text-xl group-hover:animate-bounce">🚀</span>
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none group"
            onClick={toggleMenu}
          >
            <span className={`w-6 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''} group-hover:shadow-lg`}></span>
            <span className={`w-6 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''} group-hover:shadow-lg`}></span>
            <span className={`w-6 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''} group-hover:shadow-lg`}></span>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-xl`}>
          <div className="px-4 py-6 space-y-4">
            <Link 
              to="/" 
              className={`${isActive('/')} group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md`} 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-2xl group-hover:animate-bounce">🏠</span>
              <span className="font-medium text-lg">Home</span>
            </Link>
            <Link 
              to="/posts" 
              className={`${isActive('/posts')} group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md`} 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-2xl group-hover:animate-bounce">📚</span>
              <span className="font-medium text-lg">Posts</span>
            </Link>            <Link 
              to="/create" 
              className={`${isActive('/create')} group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:shadow-md`} 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-2xl group-hover:animate-bounce">✏️</span>
              <span className="font-medium text-lg">Create</span>
            </Link>
            
            {isAuthenticated ? (
              // Authenticated mobile menu
              <>
                <Link 
                  to="/profile" 
                  className={`${isActive('/profile')} group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:shadow-md`} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-2xl group-hover:animate-bounce">👤</span>
                  <span className="font-medium text-lg">My Profile</span>
                </Link>
                <Link 
                  to="/my-posts" 
                  className={`${isActive('/my-posts')} group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md`} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-2xl group-hover:animate-bounce">📝</span>
                  <span className="font-medium text-lg">My Posts</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:shadow-md w-full text-left text-red-600"
                >
                  <span className="text-2xl group-hover:animate-bounce">🚪</span>
                  <span className="font-medium text-lg">Logout</span>
                </button>
              </>
            ) : (
              // Non-authenticated mobile menu
              <>
                <Link 
                  to="/login" 
                  className={`${isActive('/login')} group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 hover:shadow-md`} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-2xl group-hover:animate-bounce">🔐</span>
                  <span className="font-medium text-lg">Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className={`${isActive('/register')} group flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transform hover:scale-105`} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-2xl group-hover:animate-bounce">🚀</span>
                  <span className="text-lg">Get Started</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
