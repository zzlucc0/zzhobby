import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import CSS for styling

function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); // Get stored username

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Clear username
    alert('Logged out successfully');
    navigate('/'); // Redirect to home
  };

  return (
    <div className="homepage">
      <header className="header">
        <img src="/path/to/logo.png" alt="Logo" className="logo" />
        <h1>Welcome to My Sharing Platform</h1>
        {token && (
          <div className="user-info">
            <span className="welcome-text">Welcome, {username}</span>
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
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
          <img src="/path/to/homepage-image.png" alt="Homepage Visual" className="homepage-image" />
        )}
      </div>
    </div>
  );
}

export default HomePage;
