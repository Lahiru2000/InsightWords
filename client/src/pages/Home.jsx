import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to InsightWords</h1>
        <p>Share your thoughts, insights, and stories with the world</p>
        
        <div className="hero-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/register')}
          >
            Get Started
          </button>
        </div>
        
        <div className="hero-link">
          <button 
            className="link-btn"
            onClick={() => navigate('/posts')}
          >
            Browse Posts →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
