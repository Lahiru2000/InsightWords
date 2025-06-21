const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="footer-logo-icon">📝</span>
              <h3>InsightWords</h3>
            </div>
            <p className="footer-description">
              Share your thoughts, insights, and stories with the world. 
              Connect with like-minded individuals and discover amazing content.
            </p>            <div className="social-links">
              <button className="social-link" aria-label="Facebook" onClick={() => {}}>
                <span>📘</span>
              </button>
              <button className="social-link" aria-label="Twitter" onClick={() => {}}>
                <span>🐦</span>
              </button>
              <button className="social-link" aria-label="Instagram" onClick={() => {}}>
                <span>📷</span>
              </button>
              <button className="social-link" aria-label="LinkedIn" onClick={() => {}}>
                <span>💼</span>
              </button>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/posts">Browse Posts</a></li>
              <li><a href="/create">Create Post</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Community</h4>            <ul className="footer-links">
              <li><button onClick={() => {}}>Guidelines</button></li>
              <li><button onClick={() => {}}>Help Center</button></li>
              <li><button onClick={() => {}}>Contributors</button></li>
              <li><button onClick={() => {}}>Blog</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>            <ul className="footer-links">
              <li><button onClick={() => {}}>Privacy Policy</button></li>
              <li><button onClick={() => {}}>Terms of Service</button></li>
              <li><button onClick={() => {}}>Cookie Policy</button></li>
              <li><button onClick={() => {}}>Contact Us</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} InsightWords. All rights reserved.</p>
            <div className="footer-bottom-links">
              <span>Made with ❤️ for sharing ideas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
