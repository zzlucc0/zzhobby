import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import CreatePost from './components/Post/CreatePost';
import PostList from './components/Post/PostList';

function App() {
  return (
    <Router>
      <div>
        <h1>zz hobby</h1>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/" element={<PostList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
