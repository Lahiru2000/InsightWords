import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import PostList from './pages/PostList';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Posts</Link> | <Link to="/create">Create Post</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
