import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
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
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
