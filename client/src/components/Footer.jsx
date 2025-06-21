const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                InsightWords
              </h3>
            </div>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Share your thoughts, insights, and stories with the world. 
              Connect with like-minded individuals and discover amazing content.
            </p>
            <div className="flex space-x-4">
              <button className="group relative w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:scale-110 transition-all duration-300" aria-label="Facebook" onClick={() => {}}>
                <span className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative text-xl">📘</span>
              </button>
              <button className="group relative w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-xl shadow-lg hover:shadow-sky-500/25 transform hover:scale-110 transition-all duration-300" aria-label="Twitter" onClick={() => {}}>
                <span className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative text-xl">🐦</span>
              </button>
              <button className="group relative w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg hover:shadow-pink-500/25 transform hover:scale-110 transition-all duration-300" aria-label="Instagram" onClick={() => {}}>
                <span className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative text-xl">📷</span>
              </button>
              <button className="group relative w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg hover:shadow-blue-600/25 transform hover:scale-110 transition-all duration-300" aria-label="LinkedIn" onClick={() => {}}>
                <span className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative text-xl">💼</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-purple-300 border-b border-purple-500/30 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Home</span></a></li>
              <li><a href="/posts" className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Browse Posts</span></a></li>
              <li><a href="/create" className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Create Post</span></a></li>
              <li><a href="/login" className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Login</span></a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-purple-300 border-b border-purple-500/30 pb-2">Community</h4>
            <ul className="space-y-3">
              <li><button onClick={() => {}} className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Guidelines</span></button></li>
              <li><button onClick={() => {}} className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Help Center</span></button></li>
              <li><button onClick={() => {}} className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Contributors</span></button></li>
              <li><button onClick={() => {}} className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Blog</span></button></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-purple-300 border-b border-purple-500/30 pb-2">Legal</h4>
            <ul className="space-y-3">
              <li><button onClick={() => {}} className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Privacy Policy</span></button></li>
              <li><button onClick={() => {}} className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Terms of Service</span></button></li>
              <li><button onClick={() => {}} className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Cookie Policy</span></button></li>
              <li><button onClick={() => {}} className="text-slate-300 hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2 group"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span><span>Contact Us</span></button></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} InsightWords. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span>Made with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span>for sharing ideas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
