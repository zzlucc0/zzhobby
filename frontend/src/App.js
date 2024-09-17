import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import CreatePost from './components/Post/CreatePost';
import PostList from './components/Post/PostList';
import './App.css'; 

function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    navigate('/'); // Redirect to home
  };

  return (
    <div className="homepage">
      <header>
        <img src="/path/to/logo.png" alt="Logo" className="logo" />  {/* 替换成你的Logo图片 */}
        <h1>Welcome to ZzHobby</h1>
      </header>
      <div className="main-content">
        {!token ? (
          <div className="auth-buttons">
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        ) : (
          <button className="btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
        <img src="/path/to/homepage-image.png" alt="Homepage Visual" className="homepage-image" />  {/* 替换成你喜欢的主页图片 */}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<PostList />} />
      </Routes>
    </Router>
  );
}

export default App;
